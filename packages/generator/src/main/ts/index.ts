import axios from 'axios'
import cheerio from 'cheerio'

const unsupportedMethods = ['checkprojectconsistency']
const unsupportedSections = ['iDs', 'jSONEntities']

export function generateSectionCode({
  titleSection,
  methods,
}: {
  titleSection: string
  methods: string[]
}) {
  if (methods.length === 0) {
    return ''
  }

  return `
    export function ${titleSection} ({ baseUrl, auth }: { baseUrl: string, auth: {
      username: string
      password: string
    } }) {
      return {
        ${methods.join('\n')}
      }
    }
    `
}

export function generateFunction({
  methodName,
  method,
  args,
  path,
  opts,
  returnType,
  bodyType,
}: {
  methodName: string
  method: string
  args: string[]
  path: string
  opts: Array<[string, string]>
  isUnsupported: boolean
  returnType: string
  bodyType?: string
}) {
  const data = bodyType ? 'data,' : ''
  const dataType = bodyType ? `data: ${bodyType},` : ''

  const pathArgs = args.length > 0 ? `args: {${args.join(', ')}},` : ''
  const pathArgsType =
    args.length > 0
      ? `args: {${args.map((el) => `${el}: string`).join(', ')}},`
      : ''

  const params =
    opts.length > 0 ? `params: {${opts.map(([name]) => name).join(', ')}},` : ''
  const paramsType =
    opts.length > 0
      ? `params: {${opts.map(([name]) => `${name}: string`).join(', ')}},`
      : ''
  return `
  async ${methodName} ( {
    ${data} ${pathArgs} ${params}  
  }: {
  ${dataType}
  ${pathArgsType}
  ${paramsType}
  } ) {
    return axios({
      method: '${method}',
      url: \`\${baseUrl}${path}\`,
      auth,
      params: {
        ${opts.map(([name, filed]) => `${filed}: ${name}`).join(',\n')}
      },
      ${bodyType ? 'data,' : ''}
    }).then(({data}) => parseGerritResponse(data) as ${returnType})
  },
`
}

export function normaliseName(name: string) {
  const names = name.split(' ')
  const firstName = names[0]
  names[0] = firstName[0].toLowerCase() + firstName.slice(1)
  return names.join('').replace(/[,./`-]/g, '')
}

export function parseArg(arg: string) {
  const trimed = arg.slice(1, arg.length - 1)
  const parsed = trimed.split('-')
  const first = parsed[0]
  const rest = parsed.slice(1).map((str) => str[0].toUpperCase() + str.slice(1))
  return [first, ...rest].join('')
}

export function parseApiString(str: string) {
  const method = str.trim().replace(/["'`]/g, '').match(/^\S+/g)?.[0]

  const args = (str.match(/{.*?}/g) || []).map(parseArg)
  const argsCount = args.reduce((acc, el) => {
    if (acc[el]) {
      acc[el] += 1
    } else {
      acc[el] = 1
    }
    return acc
  }, {} as Record<any, any>)
  const pathCount = { ...argsCount }
  const maxCount = { ...argsCount }
  const uniqArgs = args.map((arg) => {
    const max = maxCount[arg]
    const count = argsCount[arg]
    argsCount[arg] -= 1
    return `${arg}${count === max ? '' : max - count}`
  })

  const path = str
    .replace(/{.*?}/g, (el) => {
      const parsed = parseArg(el)
      const max = maxCount[parsed]
      const count = pathCount[parsed]
      pathCount[parsed] -= 1
      return `\${${parsed}${count === max ? '' : max - count}}`
    })
    .replace(/.*\s/, '')
    .replace(/["'`]/g, '')
    .replace(/\?.+/, '')

  return {
    method,
    args: uniqArgs,
    path,
  }
}

export function parseOptions(optsSection: string[]) {
  return optsSection
    .map((el) => {
      const parsed = (el[0].toLowerCase() + el.slice(1)).split('(')
      if (!parsed[1]) {
        console.log('unsupported options:', el)
        return
      }
      parsed[1] = parsed[1].slice(0, -1)
      return parsed
    })
    .filter((el) => el)
}

export function getReturnType(method: CheerioElement) {
  const $ = cheerio.load(method)

  const sentences =
    $('.paragraph')
      .text()
      .match(/([^!.?]+[!.?]+)|([^!.?]+$)/g) || []
  const types = sentences.reduce((acc, el) => {
    if (
      el.includes('returned') ||
      el.includes('returns') ||
      el.includes('result')
    ) {
      ;(el.match(/\S+?\s(?=entries)/g) || []).forEach((type) =>
        acc.add(`${type.trim()}[]`),
      )
      ;(el.match(/\S+?\s(?=entities)/g) || []).forEach((type) =>
        acc.add(`${type.trim()}[]`),
      )
      ;(el.match(/\S+?\s(?=entity)/g) || []).forEach((type) =>
        acc.add(type.trim()),
      )
      ;(el.match(/\S+?\s(?=entry)/g) || []).forEach((type) =>
        acc.add(type.trim()),
      )
    }
    return acc
  }, new Set() as Set<string>)

  if (types.size > 1) {
    return 'any'
  }

  if (types.size === 0) {
    return 'any'
  }

  return `T${[...types][0]}`
}

export function getBodyType(method: CheerioElement) {
  const $ = cheerio.load(method)

  const sentences =
    $('.paragraph')
      .text()
      .match(/([^!.?]+[!.?]+)|([^!.?]+$)/g) || []
  const types = sentences.reduce((acc, el) => {
    if (el.includes('body')) {
      ;(el.match(/\S+?\s(?=entries)/g) || []).forEach((type) =>
        acc.add(`${type.trim()}[]`),
      )
      ;(el.match(/\S+?\s(?=entities)/g) || []).forEach((type) =>
        acc.add(`${type.trim()}[]`),
      )
      ;(el.match(/\S+?\s(?=entity)/g) || []).forEach((type) =>
        acc.add(type.trim()),
      )
    }
    return acc
  }, new Set() as Set<string>)

  if (types.size !== 1) {
    return undefined
  }

  return `T${[...types][0]}`
}

// @ts-ignore
const unsupported = []

export function getMethodInfo(method: CheerioElement) {
  const $ = cheerio.load(method)
  const path = ($('.openblock').first().text().match(/'.*?'/g) || [])[0]

  const originalName = $('h3').text()
  const methodName = normaliseName(originalName)
  const returnType = getReturnType(method)
  const bodyType = getBodyType(method)

  const opts: string[] = []
  $('.hdlist1').each((_index, element) => opts.push($(element).text()))
  const isUnsupported = !path || unsupportedMethods.includes(methodName)

  if (isUnsupported) {
    return {
      originalName,
      isUnsupported,
    }
  }

  return {
    originalName,
    methodName,
    ...parseApiString(path),
    opts: parseOptions(opts),
    returnType,
    bodyType,
    isUnsupported,
  }
}

export function getSectionInfo(section: CheerioElement) {
  const $ = cheerio.load(section)
  const titleSection = normaliseName($('h2').text())
  const methods: any[] = []
  $('div.sect2').each((_i, elem) => methods.push(getMethodInfo(elem)))

  return {
    titleSection,
    methods,
  }
}

export function parseTd(elem: CheerioElement) {
  const result: string[] = []
  const $ = cheerio.load(elem)
  cheerio
    .load(elem)('td')
    .each((_, elem) => {
      result.push($(elem).text())
    })
  return result
}

export function getTypesInfo(elem: CheerioElement) {
  const $ = cheerio.load(elem)
  const originalName = $('h3').text()
  const data: any = []
  $('tbody')
    .first()
    .children('tr')
    .each((_, elem) => {
      data.push(parseTd(elem))
    })

  return {
    typeName: originalName,
    // @ts-ignore
    fields: data.reduce((acc, [field, optional]) => {
      // @ts-ignore
      if (field && !acc.find((type) => type.name === field)) {
        acc.push({
          name: field,
          required: optional !== 'optional',
        })
      }
      return acc
    }, [] as Array<{ name: string; required: boolean }>),
  }
}

export function getTypes(section: CheerioElement) {
  const $ = cheerio.load(section)
  const titleSection = normaliseName($('h2').text())

  if (titleSection !== 'jSONEntities') {
    return
  }

  const result: any[] = []
  $('div.sect2').each((_i, elem) => result.push(getTypesInfo(elem)))

  return result
}

export async function getSections(api: string) {
  const html = await axios.get(api)
  const $ = cheerio.load(html.data)

  const resalt: CheerioElement[] = []
  $('#content > div.sect1').each((_i, elem) => resalt.push(elem))
  return resalt
}

export function generateType({
  typeName,
  fields,
}: {
  typeName: string
  fields: Array<{ name: string; required: boolean }>
}) {
  return `
    export type T${typeName} = {
      ${fields
        .map(
          ({ name, required }) =>
            `${name.replace('`', '')}${required ? '' : '?'}: any,`,
        )
        .join('\n')}
    };
  `
}

function addGlobalVariables(code: string) {
  return `
  import axios from 'axios'
  export const parseGerritResponse = (data: { data: string }) => JSON.parse(data.data.slice(4))
  ${code}
  `
}

export async function generate(api: string) {
  const sections = await getSections(api)
  const types = sections
    .map((el) => getTypes(el))
    .filter((el) => el)
    .flat()
    .map(generateType)
    .join('\n')

  const code = sections
    .map(getSectionInfo)
    .filter((section) => !unsupportedSections.includes(section.titleSection))
    .map(({ titleSection, methods }) => ({
      titleSection,
      methods: methods
        .filter(({ isUnsupported }) => !isUnsupported)
        .map(generateFunction),
    }))
    .map(generateSectionCode)
    .join('\n')

  return {
    types,
    code: addGlobalVariables(code),
  }
}

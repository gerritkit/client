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
}: {
  methodName: string
  method: string
  args: string[]
  path: string
}) {
  return `
  async ${methodName} ({${args.join(', ')}}: {${args
    .map((el) => `${el}: string`)
    .join(', ')}}) {
    return axios({
      method: '${method}',
      url: \`\${baseUrl}${path}\`,
      auth,
    }).then(parseGerritResponse)
  },
`
}

export function normaliseName(name: string) {
  const names = name.split(' ')
  const firstName = names[0]
  names[0] = firstName[0].toLowerCase() + firstName.slice(1)
  return names.join('').replace(/[.,/\-`]/g, '')
}

export function parseArg(arg: string) {
  const trimed = arg.slice(1, arg.length - 1)
  const parsed = trimed.split('-')
  const first = parsed[0]
  const rest = parsed.slice(1).map((str) => str[0].toUpperCase() + str.slice(1))
  return [first, ...rest].join('')
}

export function parseApiString(str: string) {
  const method = str.match(/^\S+/g)?.[0]
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
      return `\${${parsed}${count === max ? '' : max - count}\}`
    })
    .replace(/.*\s/, '')

  return {
    method,
    args: uniqArgs,
    path,
  }
}

// @ts-ignore
export function parseOptions(opts: any, inf: any) {
  if (inf) {
    // TODO: provide opts
    return true
  }
}

export function getMethodInfo(method: CheerioElement) {
  const $ = cheerio.load(method)
  const originalName = $('h3').text()
  const methodName = normaliseName(originalName)
  const path = $('.openblock').first().text().trim().slice(1, -1)
  const isUnsupported =
    parseOptions(methodName, $('.sect3').text()) ||
    !path ||
    unsupportedMethods.includes(methodName)

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
  $('tr').each((_, elem) => {
    data.push(parseTd(elem))
  })

  return {
    typeName: originalName,
    //@ts-ignore
    fields: data.reduce((acc, [field, optional]) => {
      //@ts-ignore
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

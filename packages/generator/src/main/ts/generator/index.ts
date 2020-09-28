import axios from 'axios'
import cheerio from 'cheerio'
import { promises as fs } from 'fs'

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

function getData(bodyType?: string) {
  return bodyType ? 'data,' : ''
}

function getDataType(bodyType?: string) {
  return bodyType ? `data: ${bodyType},` : ''
}

function getPathArgs(args: string[]) {
  return args.length > 0 ? `args: {${args.join(', ')}},` : ''
}

function getPathArgsTypes(args: string[]) {
  return args.length > 0
    ? `args: {${args.map((el) => `${el}: string`).join(', ')}},`
    : ''
}

function getParams(params: string[][]) {
  return params.length > 0
    ? `params: {${params.map(([name]) => name).join(', ')}},`
    : ''
}

function getParamsType(params: string[][]) {
  return params.length > 0
    ? `params: {${params.map(([name]) => `${name}: string`).join(', ')}},`
    : ''
}

export function generateFunction({
  methodName,
  method,
  args = [],
  path = '',
  opts = [],
  returnType,
  bodyType,
}: TMethodInfo) {
  const data = getData(bodyType)
  const dataType = getDataType(bodyType)
  const pathArgs = getPathArgs(args)
  const pathArgsTypes = getPathArgsTypes(args)

  const paramsInput = getParams(opts)
  const paramsInputTypes = getParamsType(opts)

  const empty = !data && !pathArgs && !paramsInput
  const argsStr = empty ? '' : `{${data} ${pathArgs} ${paramsInput} } :`
  const argsStrType = empty
    ? ''
    : `{${dataType} ${pathArgsTypes} ${paramsInputTypes}}`

  const params = `${opts
    .map(([name, filed]) => `${filed}: ${name}`)
    .join(',\n')}`

  return `
  async ${methodName} ( ${argsStr} ${argsStrType} ) {
    return axios({
      method: '${method}',
      url: \`\${baseUrl}${path}\`,
      auth,
      params: {
        ${params}
      },
      ${bodyType ? 'data,' : ''}
    }).then(({data}) => parseGerritResponse(data) as ${returnType})
  },
`
}

function unCapitalize(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function normaliseName(name: string) {
  return unCapitalize(name.replace(/[\s,./`-]/g, ''))
}

export function parseArg(arg: string) {
  const trimmed = arg.slice(1, arg.length - 1)
  const parsed = trimmed.split('-')
  const first = parsed[0]
  const rest = parsed.slice(1).map(capitalize)
  return [first, ...rest].join('')
}

export function parseApiString(str: string) {
  function calculateUniq(arr: string[]) {
    return arr.reduce((acc, el) => {
      if (acc[el]) {
        acc[el] += 1
      } else {
        acc[el] = 1
      }
      return acc
    }, {} as Record<string, any>)
  }

  const method = str.trim().replace(/["'`]/g, '').match(/^\S+/g)?.[0]

  const args = (str.match(/{.*?}/g) || []).map(parseArg)

  const maxCount = calculateUniq(args)
  const pathCount = { ...maxCount }
  const argsCount = { ...maxCount }

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
    .filter((el) => el) as string[][]
}

function parseTypes(sentence: string, regexp: RegExp, array?: boolean) {
  return (sentence.match(regexp) || []).map(
    (type) => `${type.trim()}${array ? '[]' : ''}`,
  )
}

export function getReturnType(method: cheerio.Element) {
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
      parseTypes(el, /\S+?\s(?=entries)/g, true).forEach((type) =>
        acc.add(type),
      )
      parseTypes(el, /\S+?\s(?=entities)/g, true).forEach((type) =>
        acc.add(type),
      )
      parseTypes(el, /\S+?\s(?=entity)/g).forEach((type) => acc.add(type))
      parseTypes(el, /\S+?\s(?=entry)/g).forEach((type) => acc.add(type))
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

export function getBodyType(method: cheerio.Element) {
  const $ = cheerio.load(method)

  const sentences =
    $('.paragraph')
      .text()
      .match(/([^!.?]+[!.?]+)|([^!.?]+$)/g) || []
  const types = sentences.reduce((acc, el) => {
    if (el.includes('body')) {
      parseTypes(el, /\S+?\s(?=entries)/g).forEach((type) => acc.add(type))
      parseTypes(el, /\S+?\s(?=entities)/g).forEach((type) => acc.add(type))
      parseTypes(el, /\S+?\s(?=entity)/g).forEach((type) => acc.add(type))
    }
    return acc
  }, new Set() as Set<string>)

  if (types.size !== 1) {
    return undefined
  }

  return `T${[...types][0]}`
}

type TMethodInfo = {
  originalName: string
  isUnsupported: boolean
  methodName?: string
  bodyType?: string
  returnType?: string
  opts?: string[][]
  method?: string
  args?: string[]
  path?: string
}

export function getMethodInfo(method: cheerio.Element): TMethodInfo {
  const $ = cheerio.load(method)
  const path = ($('.openblock').first().text().match(/'.*?'/g) || [])[0]

  const originalName = $('h3').text()
  const methodName = normaliseName(originalName)
  const returnType = getReturnType(method)
  const bodyType = getBodyType(method)

  const opts: string[] = []
  $('.hdlist1').each((_index, element) => opts.push($(element).text()))
  const isUnsupported = !path

  if (isUnsupported) {
    return {
      originalName,
      isUnsupported,
    }
  }

  const { method: parsedMethod, args, path: parsedPath } = parseApiString(path)

  return {
    originalName,
    methodName,
    args,
    returnType,
    bodyType,
    method: parsedMethod,
    path: parsedPath,
    opts: parseOptions(opts),
    isUnsupported,
  }
}

export function getSectionInfo(section: cheerio.Element) {
  const $ = cheerio.load(section)
  const titleSection = normaliseName($('h2').text())
  const methods: TMethodInfo[] = []
  $('div.sect2').each((_i, elem) => methods.push(getMethodInfo(elem)))

  return {
    titleSection,
    methods,
  }
}

export function parseTd(elem: cheerio.Element) {
  const result: string[] = []
  const $ = cheerio.load(elem)
  cheerio
    .load(elem)('td')
    .each((_, tebleItem) => {
      result.push($(tebleItem).text())
    })
  return result
}

export function getTypesInfo(elem: cheerio.Element) {
  const $ = cheerio.load(elem)
  const originalName = $('h3').text()
  const data: string[][] = []
  $('tbody')
    .first()
    .children('tr')
    .each((_, tableRow) => {
      data.push(parseTd(tableRow))
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

export function getTypes(section: cheerio.Element) {
  const $ = cheerio.load(section)
  const titleSection = normaliseName($('h2').text())

  if (titleSection !== 'jSONEntities') {
    return
  }

  const result: any[] = []
  $('div.sect2').each((_, method) => result.push(getTypesInfo(method)))

  return result
}

export async function getSections(api: string) {
  const html = await axios.get(api)
  const $ = cheerio.load(html.data)

  const result: cheerio.Element[] = []
  $('#content > div.sect1').each((_, section) => result.push(section))
  return result
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
  // NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
  const xssiPrefix = ')]}\\''
  const parseGerritResponse = (data: string) => JSON.parse(data.slice(xssiPrefix.length))
  ${code}
  `
}

export async function getDocsApiVersion(url: string) {
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)
  return $('#revnumber').first().text().split(' ')[1]
}

export async function generate(url: string) {
  const sections = await getSections(url)
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

export async function generates(urls: [string, string][], path: string) {
  await fs.mkdir(`${path}/api/`)
  await fs.mkdir(`${path}/types/`)
  for await (const [name, url] of urls) {
    const { code, types } = await generate(url)
    await Promise.all([
      fs.writeFile(`${path}/api/${name}.ts`, code),
      fs.writeFile(`${path}/types/${name}.ts`, types),
    ])
  }
}

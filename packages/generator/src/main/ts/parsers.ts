import axios from 'axios'
import cheerio from 'cheerio'

import { TMethodInfo, TSectionInfo } from './types'

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function unCapitalize(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export function normaliseName(name: string) {
  return unCapitalize(name.replace(/[\s,./`-]/g, ''))
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

export function getBodyType(method: cheerio.Element) {
  const $ = cheerio.load(method)

  const sentences =
    $('.paragraph')
      .text()
      .match(/([^!.?]+[!.?]+)|([^!.?]+$)/g) || []
  const types = sentences.reduce(
    (acc, el) => {
      if (el.includes('body')) {
        parseTypes(el, /\S+?\s(?=entries)/g).forEach((type) => acc.push(type))
        parseTypes(el, /\S+?\s(?=entities)/g).forEach((type) => acc.push(type))
        parseTypes(el, /\S+?\s(?=entity)/g).forEach((type) => acc.push(type))
      }
      return acc
    },
    [] as Array<{
      wrapper?: string
      type: string
    }>,
  )

  if (types.length !== 1) {
    return
  }

  return types[0]
}

export function getDescription(method: cheerio.Element) {
  return cheerio.load(method)('.sect2 > .paragraph').text()
}

export function getMethodInfo(
  method: cheerio.Element,
): TMethodInfo | undefined {
  const description = getDescription(method)
  const path = (cheerio
    .load(method)('.openblock')
    .first()
    .text()
    .match(/'.*?'/g) || [])[0]

  const originalName = cheerio.load(method)('h3').text()
  const methodName = normaliseName(originalName)
  const returnType = getReturnType(method)
  const bodyType = getBodyType(method)
  const opts: string[] = []
  cheerio
    .load(method)('.hdlist1')
    .each((_index, element) => opts.push(cheerio.load(method)(element).text()))

  if (!path) {
    return
  }

  const { method: parsedMethod, args, path: parsedPath } = parseApiString(path)

  return {
    originalName,
    methodName,
    inputs: {
      args,
      body: bodyType,
      params: parseOptions(opts),
    },
    returnType,
    description,
    method: parsedMethod,
    path: parsedPath,
  }
}

export function getSectionInfo(section: cheerio.Element): TSectionInfo {
  const $ = cheerio.load(section)
  const titleSection = normaliseName($('h2').text())
  const methods: TMethodInfo[] = []
  $('div.sect2').each((_i, elem) => {
    const res = getMethodInfo(elem)
    if (res) {
      methods.push(res)
    }
  })

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

export function parseArg(arg: string) {
  const trimmed = arg.slice(1, -1)
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

  const method = str.trim().replace(/["'`]/g, '').match(/^\S+/g)?.[0] || ''

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

function parseTypes(sentence: string, regexp: RegExp) {
  let wrapper: 'map' | 'list' | undefined
  if (sentence.includes('map')) {
    wrapper = 'map'
  }

  if (sentence.includes('list')) {
    wrapper = 'list'
  }

  return (sentence.match(regexp) || []).map((type) => ({
    type: type.trim(),
    wrapper,
  }))
}

export function getReturnType(method: cheerio.Element) {
  const $ = cheerio.load(method)

  const sentences =
    $('.paragraph')
      .text()
      .match(/([^!.?]+[!.?]+)|([^!.?]+$)/g) || []
  const types = sentences.reduce(
    (acc, el) => {
      if (
        el.includes('returned') ||
        el.includes('returns') ||
        el.includes('result')
      ) {
        parseTypes(el, /\S+?\s(?=entries)/g).forEach((type) => acc.push(type))
        parseTypes(el, /\S+?\s(?=entities)/g).forEach((type) => acc.push(type))
        parseTypes(el, /\S+?\s(?=entity)/g).forEach((type) => acc.push(type))
        parseTypes(el, /\S+?\s(?=entry)/g).forEach((type) => acc.push(type))
      }
      return acc
    },
    [] as Array<{
      wrapper?: string
      type: string
    }>,
  )

  if (types.length > 1) {
    return {
      type: 'any',
    }
  }

  if (types.length === 0) {
    return {
      type: 'any',
    }
  }

  return types[0]
}

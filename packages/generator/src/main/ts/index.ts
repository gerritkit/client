import axios from 'axios'
import cheerio from 'cheerio'
import { promises as fs } from 'fs'

import {
  addGlobalVariables,
  formatType,
  generateFunction,
  generateSectionCode,
  generateType,
  getDataType,
  getParamsType,
  getPathArgsTypes,
} from './formatters'
import { getSectionInfo, getSections, getTypes } from './parsers'
import { TMethodInfo } from './types'

const unsupportedSections = ['iDs', 'jSONEntities']

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

  const formattedTypes = types.map(generateType).join('\n')

  const typesForDocs = types.reduce((acc, el) => {
    acc[el.typeName] = generateType(el).slice('export type'.length)
    return acc
  }, {})

  const code = sections
    .map(getSectionInfo)
    .filter((section) => !unsupportedSections.includes(section.titleSection))

  const importTypes = [
    ...new Set([
      ...code.flatMap((el) => el.methods.map((q) => q.inputs.body?.type)),
      ...code.flatMap((el) => el.methods.map((q) => q.returnType?.type)),
    ]),
  ]
    .filter((el) => el && el !== 'any')
    .map((type) => `T${type}`)

  return {
    types: formattedTypes,
    docs: generateDocs(code, typesForDocs),
    code: addGlobalVariables(
      importTypes,
      code
        .map(({ titleSection, methods }) => ({
          titleSection,
          methods: methods.map(generateFunction),
        }))
        .map(generateSectionCode)
        .join('\n'),
    ),
  }
}

export async function generates(urls: [string, string][], path: string) {
  await fs.mkdir(`${path}/api/`)
  await fs.mkdir(`${path}/types/`)
  await fs.mkdir(`${path}/docs/`)
  await Promise.all(
    urls.map(async ([name, url]) => {
      const { code, types, docs } = await generate(url)
      await Promise.all([
        fs.writeFile(`${path}/api/${name}.ts`, code),
        fs.writeFile(`${path}/types/${name}.ts`, types),
        fs.writeFile(`${path}/docs/${name}.md`, docs),
      ])
    }),
  )
}

export function generateDocs(
  data: { titleSection: string; methods: TMethodInfo[] }[],
  types: Record<string, string>,
) {
  const a = data.map((data) => {
    return `
## ${data.titleSection}
${data.methods.map(
  ({ methodName, description, returnType, inputs: { body, params, args } }) => {
    return `
### native.${data.titleSection}.${methodName}(input: TInput)
#### inputs:
\`\`\`typescript
type TInput = {
  ${args ? getPathArgsTypes(args || []) : ''}
  ${body ? types[getDataType(formatType(body))] : ''}
  ${params ? getParamsType(params) : ''}
}
\`\`\`
#### returns:
\`\`\`typescript
${types[returnType?.type] ? `${types[returnType?.type]}` : ''}
\`\`\`
${description || ''}
`
  },
)}
`
  })
  return `
${a}
`
}

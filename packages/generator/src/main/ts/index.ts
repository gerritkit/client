import axios from 'axios'
import cheerio from 'cheerio'
import { promises as fs } from 'fs'

import {
  addGlobalVariables,
  generateDocs,
  generateFunction,
  generateSectionCode,
  generateType,
} from './formatters'
import { getSectionInfo, getSections, getTypes } from './parsers'

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

  const sectionInfos = sections
    .map(getSectionInfo)
    .filter((section) => !unsupportedSections.includes(section.titleSection))

  const importTypes = [
    ...new Set([
      ...sectionInfos.flatMap((el) => el.methods.map((q) => q.inputs.body?.type)),
      ...sectionInfos.flatMap((el) => el.methods.map((q) => q.returnType?.type)),
    ]),
  ]
    .filter((el) => el && el !== 'any')
    .map((type) => `T${type}`)

  return {
    types: formattedTypes,
    docs: generateDocs(sectionInfos, typesForDocs),
    code: addGlobalVariables(
      importTypes,
      sectionInfos
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

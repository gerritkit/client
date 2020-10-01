import axios from 'axios'
import cheerio from 'cheerio'
import { promises as fs } from 'fs'
import { getSectionInfo, getTypes, getSections } from './parsers'
import {
  addGlobalVariables,
  generateFunction,
  generateSectionCode,
  generateType,
} from './formatters'

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

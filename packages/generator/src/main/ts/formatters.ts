import { TMethodInfo } from './types'

export function addGlobalVariables(types: string[], code: string) {
  return `
  import axios from 'axios'
  import {
    ${types.join(', \n')}
     } from '../types/index'
  // NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
  const xssiPrefix = ')]}\\''
  const parseGerritResponse = (data: string) => JSON.parse(data.slice(xssiPrefix.length))
  ${code}
  `
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

function getData(bodyType?: string) {
  return bodyType ? 'data,' : ''
}

function getDataType(bodyType?: string) {
  return bodyType ? `data: ${bodyType},` : ''
}

function getPathArgs(args: string[]) {
  return args.length > 0 ? `args: {${args.join(', ')}},` : ''
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
  const data = getData(mygenerateFunc(bodyType))
  const dataType = getDataType(mygenerateFunc(bodyType))
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
    }).then(({data}) => parseGerritResponse(data) as ${mygenerateFunc(
      returnType,
    )})
  },
`
}

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
        ${titleSection}: {
          ${methods.join('\n')}  
        }
      }
    }
    `
}

function mygenerateFunc(data: { wrapper?: string; type: string } | undefined) {
  if (!data) {
    return
  }

  const { type, wrapper } = data
  if (type === 'any') return 'any'
  if (wrapper === 'map') return `Record<string, T${type}>`
  if (wrapper === 'list') return `T${type}[]`
  return `T${type}`
}

// export function generateIndexSection(types: string[], code: string) {
//   return `
//   import { ${types.join(',\n')} } from '../types/index'
//   ${code}
//   `
// }

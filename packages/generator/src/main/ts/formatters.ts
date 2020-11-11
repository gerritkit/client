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

export function getPathArgsTypes(args?: string[]) {
  return args && args?.length > 0
    ? `args: {${args.map((el) => `${el}: string`).join(', ')}},`
    : ''
}

function getParams(params?: string[][]) {
  return params && params.length > 0
    ? `params: {${params.map(([name]) => name).join(', ')}},`
    : ''
}

export function getParamsType(params?: string[][]) {
  return params && params.length > 0
    ? `params: {${params.map(([name]) => `${name}?: string`).join(', ')}},`
    : ''
}

export function getData(bodyType?: string) {
  return bodyType ? 'data,' : ''
}

export function getDataType(bodyType?: string) {
  return bodyType ? `data: ${bodyType},` : ''
}

export function getPathArgs(args?: string[]) {
  return args && args.length > 0 ? `args: {${args.join(', ')}},` : ''
}

export function generateFunction({
  methodName,
  method,
  inputs,
  path = '',
  returnType,
}: TMethodInfo) {
  const { args, body, params } = inputs
  const data = getData(formatType(body))
  const dataType = getDataType(formatType(body))
  const pathArgs = getPathArgs(args)
  const pathArgsTypes = getPathArgsTypes(args)

  const paramsInput = getParams(params)
  const paramsInputTypes = getParamsType(params)

  const empty = !data && !pathArgs && !paramsInput
  const argsStr = empty ? '' : `{${data} ${pathArgs} ${paramsInput} } :`
  const argsStrType = empty
    ? ''
    : `{${dataType} ${pathArgsTypes} ${paramsInputTypes}}`

  const formattedParams = `${
    params && params.map(([name, filed]) => `${filed}: ${name}`).join(',\n')
  }`

  return `
  async ${methodName} ( ${argsStr} ${argsStrType} ) {
    return axios({
      method: '${method}',
      url: \`\${baseUrl}${path}\`,
      auth,
      params: {
        ${formattedParams}
      },
      ${body ? 'data,' : ''}
    }).then(({data}) => parseGerritResponse(data) as ${formatType(returnType)})
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

export function formatType(
  data: { wrapper?: string; type: string } | undefined,
) {
  if (!data) {
    return
  }

  const { type, wrapper } = data
  if (type === 'any') return 'any'
  if (wrapper === 'map') return `Record<string, T${type}>`
  if (wrapper === 'list') return `T${type}[]`
  return `T${type}`
}

export function generateDocs(
  data: { titleSection: string; methods: TMethodInfo[] }[],
  types: Record<string, string>,
) {
  return `
${data.map((data) => {
  return `
## ${data.titleSection}
${data.methods
  .map(
    ({
      methodName,
      description,
      returnType,
      inputs: { body, params, args },
    }) => {
      return `
### nativeClient.${data.titleSection}.${methodName}(${
        !args && !body && !params ? `` : 'input: TInput'
      })

${
  !args && !body && !params
    ? ''
    : `
#### Arguments:
\`\`\`typescript
type TInput = {
  ${args ? getPathArgsTypes(args || []) : ''}
  ${body ? types[getDataType(formatType(body))] : ''}
  ${params ? getParamsType(params) : ''}
}
\`\`\`
`
}


#### Returns:
\`\`\`typescript
${
  types[returnType?.type]
    ? `${types[returnType?.type]}`
    : 'type TReturnType = any'
}
\`\`\`
${description ? description.toString() : ''}
`
    },
  )
  .join('')}
`
})}
`
}

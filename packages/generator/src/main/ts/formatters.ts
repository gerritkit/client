import { TMethodInfo } from './types'

export function addGlobalVariables(code: string) {
  return `
  import axios from 'axios'
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
  // if(opts.length > 0) {
  //   console.log('-opts-', opts)
  //   process.exit()
  // }

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

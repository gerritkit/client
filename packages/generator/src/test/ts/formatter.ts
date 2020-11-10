import { generateFunction } from '../../main/ts/formatters'
import { parseOptions } from '../../main/ts/parsers'

describe('formatter', () => {
  it('generateFunction', async () => {
    const res = generateFunction({
      originalName: 'List Child Projects',
      methodName: 'listChildProjects',
      inputs: { args: ['projectName'], params: [] },
      returnType: { type: 'ProjectInfo', wrapper: 'list' },
      description:
        '\nList the direct child projects of a project.\n\nAs result a list of ProjectInfo entries is\nreturned that describe the child projects.\n\nTo resolve the child projects of a project recursively the parameter\nrecursive can be set.\n\nChild projects that are not visible to the calling user are ignored and\nare not resolved further.\n',
      method: 'GET',
      path: '/projects/${projectName}/children/',
    })
    expect(res).toBe(
      `
  async listChildProjects ( { args: {projectName},  } : { args: {projectName: string}, } ) {
    return axios({
      method: 'GET',
      url: \`\${baseUrl}/projects/\${projectName}/children/\`,
      auth,
      params: {
        
      },
      
    }).then(({data}) => parseGerritResponse(data) as TProjectInfo[])
  },
`,
    )
  })

  it('generateFunction with opts', async () => {
    const res = generateFunction({
      description: '',
      originalName: 'test',
      methodName: 'listProjects',
      method: 'GET',
      inputs: {
        args: [],
        params: [
          ['branch', 'b'],
          ['description', 'd'],
          ['limit', 'n'],
          ['prefix', 'p'],
          ['regex', 'r'],
          ['skip', 's'],
          ['substring', 'm'],
          ['tree', 't'],
          ['type', 'type'],
          ['state', 's'],
        ],
      },
      path: '/projects/',
      returnType: {
        type: 'any',
      },
    })
    expect(res).toBe(`
  async listProjects ( {  params: {branch, description, limit, prefix, regex, skip, substring, tree, type, state}, } : {  params: {branch?: string, description?: string, limit?: string, prefix?: string, regex?: string, skip?: string, substring?: string, tree?: string, type?: string, state?: string},} ) {
    return axios({
      method: 'GET',
      url: \`\${baseUrl}/projects/\`,
      auth,
      params: {
        b: branch,
d: description,
n: limit,
p: prefix,
r: regex,
s: skip,
m: substring,
t: tree,
type: type,
s: state
      },
      
    }).then(({data}) => parseGerritResponse(data) as any)
  },
`)
  })

  it('parseOptions', async () => {
    const res = parseOptions([
      'Branch(b)',
      'Description(d)',
      'Limit(n)',
      'Prefix(p)',
      'Regex(r)',
      'Skip(S)',
      'Substring(m)',
      'Tree(t)',
      'Type(type)',
      'All',
      'State(s)',
    ])
    expect(res).toMatchObject([
      ['branch', 'b'],
      ['description', 'd'],
      ['limit', 'n'],
      ['prefix', 'p'],
      ['regex', 'r'],
      ['skip', 'S'],
      ['substring', 'm'],
      ['tree', 't'],
      ['type', 'type'],
      ['state', 's'],
    ])
  })
})

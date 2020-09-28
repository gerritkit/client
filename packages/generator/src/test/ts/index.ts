import {
  getSectionInfo,
  getSections,
  parseApiString,
  parseOptions,
  normaliseName,
} from '../../main/ts/generator/parsers'
import { generateFunction } from '../../main/ts/generator/formatters'
import { generate } from '@gerritkit/generator'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import stubDoc from './stub/api.json'



describe('generator', () => {
  const testDocsUrl = 'gerrit-host/Documentation/rest-api-projects.html'

  const mock = new MockAdapter(axios)
  mock.onGet(testDocsUrl).reply(200, stubDoc)

  it('getEndpoints ', async () => {
    const sections = await getSections(testDocsUrl)
    expect(sections.length).toBe(9)
  })

  it('getSectionInfo', async () => {
    const sections = await getSections(testDocsUrl)
    const section = sections[2]
    const res = getSectionInfo(section)
    expect(res).toMatchObject({
      titleSection: 'childProjectEndpoints',
      methods: [
        {
          originalName: 'List Child Projects',
          methodName: 'listChildProjects',
          method: 'GET',
          args: ['projectName'],
          path: '/projects/${projectName}/children/',
          opts: [],
          isUnsupported: false,
        },
        {
          originalName: 'Get Child Project',
          methodName: 'getChildProject',
          method: 'GET',
          args: ['projectName', 'projectName1'],
          path: '/projects/${projectName}/children/${projectName1}',
          opts: [],
          isUnsupported: false,
        },
      ],
    })
  })

  it('normaliseName', async () => {
    expect(normaliseName('List Projects')).toBe('listProjects')
    expect(normaliseName('Project')).toBe('project')
    expect(normaliseName('foo, Bar .,. baz')).toBe('fooBarbaz')
  })

  it('parseApiString', async () => {
    expect(
      parseApiString(
        'GET /projects/{project-name}/children/{project-name}/children/{project-name}',
      ),
    ).toMatchObject({
      method: 'GET',
      args: ['projectName', 'projectName1', 'projectName2'],
      path:
        '/projects/${projectName}/children/${projectName1}/children/${projectName2}',
    })

    expect(
      parseApiString('GET /projects/{project-name}/branches/{branch-id}'),
    ).toMatchObject({
      method: 'GET',
      args: ['projectName', 'branchId'],
      path: '/projects/${projectName}/branches/${branchId}',
    })

    expect(
      parseApiString(
        'GET /projects/{project-name}/branches/{branch-id}/files/{file-id}/content',
      ),
    ).toMatchObject({
      method: 'GET',
      args: ['projectName', 'branchId', 'fileId'],
      path:
        '/projects/${projectName}/branches/${branchId}/files/${fileId}/content',
    })

    expect(
      parseApiString(
        'GET /projects/{project-name}/branches/{branch-id}/reflog',
      ),
    ).toMatchObject({
      method: 'GET',
      args: ['projectName', 'branchId'],
      path: '/projects/${projectName}/branches/${branchId}/reflog',
    })
  })

  it('generateFunction', async () => {
    const res = generateFunction({
      originalName: 'test',
      methodName: 'listChildProjects',
      method: 'GET',
      args: ['projectName'],
      path: '/projects/${projectName}/children/',
      opts: [],
      isUnsupported: false,
      returnType: 'any',
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
      
    }).then(({data}) => parseGerritResponse(data) as any)
  },
`,
    )
  })

  it('generateFunction with opts', async () => {
    const res = generateFunction({
      originalName: 'test',
      methodName: 'listProjects',
      method: 'GET',
      args: [],
      path: '/projects/',
      opts: [
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
      returnType: 'any',
      isUnsupported: false,
    })
    expect(res).toBe(`
  async listProjects ( {  params: {branch, description, limit, prefix, regex, skip, substring, tree, type, state}, } : {  params: {branch: string, description: string, limit: string, prefix: string, regex: string, skip: string, substring: string, tree: string, type: string, state: string},} ) {
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

  it('generate', async () => {
    const { code, types } = await generate(testDocsUrl)
    expect(code).toMatchSnapshot()
    expect(types).toMatchSnapshot()
  })
})

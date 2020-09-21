import {
  getSections,
  getSectionInfo,
  normaliseName,
  parseApiString,
  generateFunction,
  generate,
} from '../../main/ts'
// import fs from 'fs'
// import exp from 'constants'
const api =
  'https://gerrit-review.googlesource.com/Documentation/rest-api-projects.html'

describe('generator', () => {
  it('getEndpoints ', async () => {
    const sections = await getSections(api)
    expect(sections.length).toBe(9)
  })

  it('getSectionInfo', async () => {
    const sections = await getSections(api)
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
          isUnsupported: false,
        },
        {
          originalName: 'Get Child Project',
          methodName: 'getChildProject',
          method: 'GET',
          args: ['projectName', 'projectName1'],
          path: '/projects/${projectName}/children/${projectName1}',
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
      methodName: 'listChildProjects',
      method: 'GET',
      args: ['projectName'],
      path: '/projects/${projectName}/children/',
    })
    expect(res).toBe(
      `
  async listChildProjects ({projectName}) {
    return axios({
      method: 'GET',
      url: \`\${baseUrl}/projects/\${projectName}/children/\`,
      auth,
    })
  },
`,
    )
  })

  it('generate', async () => {
    const { code, types } = await generate(api)
    expect(code).toMatchSnapshot()
    expect(types).toMatchSnapshot()
    // console.log(`${process.cwd()}/test.js`)
    // fs.writeFileSync(`${process.cwd()}/test.ts`, code)
    // fs.writeFileSync(`${process.cwd()}/types.ts`, types)
    // console.log('1')
  })
})

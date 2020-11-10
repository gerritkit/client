import {
  getSectionInfo,
  getSections,
  normaliseName,
  parseApiString,
} from '../../main/ts/parsers'
import { TSectionInfo } from '../../main/ts/types'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import stubDoc from './stub/api.json'

describe('parser', () => {
  const testDocsUrl = 'gerrit-host/Documentation/rest-api-projects.html'

  const mock = new MockAdapter(axios)
  mock.onGet(testDocsUrl).reply(200, stubDoc)
  it('getEndpoints ', async () => {
    const sections = await getSections(testDocsUrl)
    expect(sections.length).toBe(9)
  })

  it('getSectionInfo simple', async () => {
    const sections = await getSections(testDocsUrl)
    const section = sections[2]
    const res: TSectionInfo = getSectionInfo(section)
    expect(res).toMatchObject({
      titleSection: 'childProjectEndpoints',
      methods: [
        {
          originalName: 'List Child Projects',
          methodName: 'listChildProjects',
          inputs: { args: ['projectName'], params: [] },
          returnType: { type: 'ProjectInfo', wrapper: 'list' },
          description:
            '\nList the direct child projects of a project.\n\nAs result a list of ProjectInfo entries is\nreturned that describe the child projects.\n\nTo resolve the child projects of a project recursively the parameter\nrecursive can be set.\n\nChild projects that are not visible to the calling user are ignored and\nare not resolved further.\n',
          method: 'GET',
          path: '/projects/${projectName}/children/',
        },
        {
          originalName: 'Get Child Project',
          methodName: 'getChildProject',
          inputs: { args: ['projectName', 'projectName1'], params: [] },
          returnType: { type: 'ProjectInfo' },
          description:
            '\nRetrieves a child project. If a non-direct child project should be\nretrieved the parameter recursive must be set.\n\nAs response a ProjectInfo entity is returned that\ndescribes the child project.\n',
          method: 'GET',
          path: '/projects/${projectName}/children/${projectName1}',
        },
      ],
    })
  })

  it('getSectionInfo with params', async () => {
    const sections = await getSections(testDocsUrl)
    const section = sections[0]
    const res = getSectionInfo(section)
    expect(res).toMatchSnapshot()
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
})

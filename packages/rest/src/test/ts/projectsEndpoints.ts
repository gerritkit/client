import { GerritKit } from '../../main/ts'
import axios from 'axios'

jest.mock('axios')
// @ts-ignore
axios.get.mockImplementation(() => Promise.resolve({ data: ')))){}' }))

describe('projectsEndpoints', () => {
  describe('#listProjects', () => {
    it('makes the right request', async () => {
      const spy = jest.spyOn(axios, 'get')
      const gerritKit = new GerritKit('https://gerrit.com', {
        username: 'username',
        password: 'password',
      })

      await gerritKit.projectsEndpoints.listProjects({
        limit: 10,
        prefix: 'prefix',
        branch: 'branch',
        description: 'description',
        regex: 'regex',
        skip: 'skip',
        state: 'state',
        substring: 'substring',
        tree: 'tree',
        type: 'type',
      })

      expect(spy).toBeCalledWith('https://gerrit.com/a/projects/', {
        auth: { password: 'password', username: 'username' },
        params: {
          S: 'skip',
          b: 'branch',
          d: 'description',
          m: 'substring',
          n: 10,
          p: 'prefix',
          r: 'regex',
          s: 'state',
          t: 'tree',
          type: 'type',
        },
      })
    })
  })
})

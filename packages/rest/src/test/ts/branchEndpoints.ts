import { GerritKit } from '../../main/ts'
import axios from 'axios'

jest.mock('axios')
// @ts-ignore
axios.get.mockImplementation(() => Promise.resolve({ data: ')))){}' }))

describe('branchEndpoints', () => {
  describe('#getBranch', () => {
    it('makes the right request', async () => {
      const spy = jest.spyOn(axios, 'get')
      const gerritKit = new GerritKit('https://gerrit.com', {
        username: 'username',
        password: 'password',
      })

      await gerritKit.branchEndpoints.getBranch('reponame', 'master')
      expect(spy).toBeCalledWith(
        'https://gerrit.com/a/projects/reponame/branches/master',
        {
          auth: {
            password: 'password',
            username: 'username',
          },
        },
      )
    })
  })

  describe('#getContent', () => {
    it('makes the right request', async () => {
      const spy = jest.spyOn(axios, 'get')
      const gerritKit = new GerritKit('https://gerrit.com', {
        username: 'username',
        password: 'password',
      })

      await gerritKit.branchEndpoints.getContent(
        'reponame',
        'master',
        'filename',
      )
      expect(spy).toBeCalledWith(
        'https://gerrit.com/a/projects/reponame/branches/master/files/filename/content',
        {
          auth: {
            password: 'password',
            username: 'username',
          },
        },
      )
    })
  })
})

import { GerritKit } from '../../main/ts'
import axios from 'axios'

jest.mock('axios')
// @ts-ignore
axios.get.mockImplementation(() => Promise.resolve({ data: ')))){}' }))

describe('commitEndpoints', () => {
  describe('#getBranch', () => {
    it('makes the right request', async () => {
      const spy = jest.spyOn(axios, 'get')
      const gerritKit = new GerritKit('https://gerrit.com', {
        username: 'username',
        password: 'password',
      })

      await gerritKit.commitEndpoints.getCommit('reponame', 'commit')
      expect(
        spy,
      ).toBeCalledWith(
        'https://gerrit.com/a/projects/reponame/commits/commit',
        { auth: { password: 'password', username: 'username' } },
      )
    })
  })
})

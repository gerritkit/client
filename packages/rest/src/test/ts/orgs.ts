import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { GerritKit } from '../../main/ts'

describe('orgs', () => {
  const mock = new MockAdapter(axios)
  const gerritKit = new GerritKit('https://baseurl/a', {
    username: 'username',
    password: 'username',
  })

  it('list', async () => {
    const url = 'https://baseurl/a/projects/'
    const response = `)]}'
  {
    "external/bison": {
      "id": "external%2Fbison",
      "description": "GNU parser generator"
    },
    "external/gcc": {
      "id": "external%2Fgcc"
    },
    "external/openssl": {
      "id": "external%2Fopenssl",
      "description": "encryption\\ncrypto routines"
    },
    "test": {
      "id": "test",
      "description": "\u003chtml\u003e is escaped"
    }
  }`

    mock.onGet(url).reply(200, response)
    expect(await gerritKit.orgs.list()).toMatchObject(['external', 'test'])
  })
})

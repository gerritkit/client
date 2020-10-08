import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { GerritKit } from '../../main/ts'

describe('repos', () => {
  const mock = new MockAdapter(axios)
  const gerritKit = new GerritKit('https://baseurl/a', {
    username: 'username',
    password: 'password',
  })

  it('getCommit', async () => {
    const url =
      'https://baseurl/a/projects/work%2Fmy-project/commits/a8a477efffbbf3b44169bb9a1d3a334cbbd9aa96'

    const responce = `)]}'
  {
    "commit": "184ebe53805e102605d11f6b143486d15c23a09c",
    "parents": [
      {
        "commit": "1eee2c9d8f352483781e772f35dc586a69ff5646",
        "subject": "Migrate contributor agreements to All-Projects."
      }
    ],
    "author": {
      "name": "Shawn O. Pearce",
      "email": "sop@google.com",
      "date": "2012-04-24 18:08:08.000000000",
      "tz": -420
    },
    "committer": {
      "name": "Shawn O. Pearce",
      "email": "sop@google.com",
      "date": "2012-04-24 18:08:08.000000000",
      "tz": -420
    },
    "subject": "Use an EventBus to manage star icons",
    "message": "Use an EventBus to manage star icons\\n\\nImage widgets that need to ..."
  }`

    mock.onGet(url).reply(200, responce)
    expect(
      await gerritKit.repos.getCommit({
        owner: 'work',
        repo: 'my-project',
        ref: 'a8a477efffbbf3b44169bb9a1d3a334cbbd9aa96',
      }),
    ).toMatchObject({
      commit: '184ebe53805e102605d11f6b143486d15c23a09c',
      parents: [
        {
          commit: '1eee2c9d8f352483781e772f35dc586a69ff5646',
          subject: 'Migrate contributor agreements to All-Projects.',
        },
      ],
      author: {
        name: 'Shawn O. Pearce',
        email: 'sop@google.com',
        date: '2012-04-24 18:08:08.000000000',
        tz: -420,
      },
      committer: {
        name: 'Shawn O. Pearce',
        email: 'sop@google.com',
        date: '2012-04-24 18:08:08.000000000',
        tz: -420,
      },
      subject: 'Use an EventBus to manage star icons',
      message:
        'Use an EventBus to manage star icons\n\nImage widgets that need to ...',
    })
  })

  it('getContent', async () => {
    const url =
      'https://baseurl/a/projects/work%2Fmy-project/branches/a8a477efffbbf3b44169bb9a1d3a334cbbd9aa96/files/src%2Ffile.js/content'
    const response = `responsefile`

    mock.onGet(url).reply(200, response)
    expect(
      await gerritKit.repos
        .getContent({
          owner: 'work',
          repo: 'my-project',
          path: 'src%2Ffile.js',
          ref: 'a8a477efffbbf3b44169bb9a1d3a334cbbd9aa96',
        })
        .catch(console.log),
    ).toMatch('responsefile')
  })

  it('listForOrg', async () => {
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
    }
  }`

    mock.onGet(url).reply(200, response)
    expect(
      await gerritKit.repos
        .listForOrg({
          org: 'external',
        })
        .catch(console.log),
    ).toMatchObject(['external/bison', 'external/gcc', 'external/openssl'])
  })
})

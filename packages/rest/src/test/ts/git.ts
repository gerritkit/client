import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { GerritKit } from '../../main/ts'

describe('git', () => {
  const mock = new MockAdapter(axios)
  const gerritKit = new GerritKit('https://baseurl/a', {
    username: 'username',
    password: 'password',
  })

  it('getCommit', async () => {
    const url =
      'https://baseurl/a/projects/owner%2Frepo/commits/c5ed9dfcbf002ca0e432d788dab6ca2387829ca7'
    const response = `)]}'{
  "sha": "c5ed9dfcbf002ca0e432d788dab6ca2387829ca7",
  "commit": "ef1c270142f9581ecf768f4193fc8f8a81102ec2",
  "parents": [
    {
      "commit": "commit",
      "subject": "feat: subject"
    }
  ],
  "author": {
    "name": "name",
    "email": "email@email.ru",
    "date": "2020-10-02 08:06:05.000000000",
    "tz": 180
  },
  "committer": {
    "name": "name",
    "email": "email@email.ru",
    "date": "2020-10-02 08:06:05.000000000",
    "tz": 180
  },
  "subject": "jsubject",
  "message": "message\\n"
}`

    mock.onGet(url).reply(200, response)
    expect(
      await gerritKit.git.getCommit({
        owner: 'owner',
        repo: 'repo',
        commit_sha: 'c5ed9dfcbf002ca0e432d788dab6ca2387829ca7',
      }),
    ).toMatchObject({
      sha: 'c5ed9dfcbf002ca0e432d788dab6ca2387829ca7',
      commit: 'ef1c270142f9581ecf768f4193fc8f8a81102ec2',
      parents: [
        {
          commit: 'commit',
          subject: 'feat: subject',
        },
      ],
      author: {
        name: 'name',
        email: 'email@email.ru',
        date: '2020-10-02 08:06:05.000000000',
        tz: 180,
      },
      committer: {
        name: 'name',
        email: 'email@email.ru',
        date: '2020-10-02 08:06:05.000000000',
        tz: 180,
      },
      subject: 'jsubject',
      message: 'message\n',
    })
  })
})

import { generate } from '../../main/ts/index'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import stubDoc from './stub/api.json'

describe('generator', () => {
  const testDocsUrl = 'gerrit-host/Documentation/rest-api-projects.html'

  const mock = new MockAdapter(axios)
  mock.onGet(testDocsUrl).reply(200, stubDoc)

  it('generate', async () => {
    const { code, types } = await generate(testDocsUrl)
    expect(code).toMatchSnapshot()
    expect(types).toMatchSnapshot()
  })
})

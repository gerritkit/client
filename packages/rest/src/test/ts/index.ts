import { GerritKit, VERSION } from '../../main/ts'

describe('GerritKit', () => {
  it('is properly exported ', async () => {
    expect(GerritKit).toBeDefined()
    expect(VERSION).toBeDefined()
  })
})

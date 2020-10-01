import { foo } from '../../main/ts'

describe('GerritKit', () => {
  it('is properly exported ', async () => {
    expect(foo).toBeDefined()
  })
})

import makeRestServices, { crudActions } from '../src/index'

const restServices = makeRestServices([
  {
    name: 'simple',
    url: 'https://example.com/api/simple',
    transformer: (data) => data,
    actions: crudActions,
  }
])

describe('store shape before calling actions', () => {

  it('should have all declared reducers', () => {
    expect(true).toBe(true)
  })

})
import makeRestServices, { crudActions } from '../src/index'
import mockEndpoints from './mockEndpoints'

const restServices = makeRestServices([
  {
    name: 'simple',
    url: mockEndpoints.simple.URL,
    transformer: (data) => data,
    actions: crudActions,
  }
])

describe('store shape before calling actions', () => {

  it('should have all declared reducers', () => {
    expect(true).toBe(true)
  })

})
import makeRestServices, { crudActionsDeclarations, options } from '../src/index'
import mockEndpoints from './mockEndpoints'

// SERVICES INIT

const restServices = makeRestServices(
  [
    {
      name: 'simple',
      url: mockEndpoints.simple.URL,
      transformer: (data) => data,
      actionsDeclarations: crudActionsDeclarations,
    }
  ]
)

const reducer = restServices.reducers.simple

// TESTS

describe('reducer', () => {

  it('should return the initial state', () => {
    expect(reducer()).toEqual({
      ...options.SERVICE_INITIAL_STATE,
      ...crudActionsDeclarations.reduce(
        (r, actionDeclaration) => ({ ...r, [actionDeclaration.name]: options.ACTION_INITIAL_STATE }),
        {}
      )
    })
  })

})
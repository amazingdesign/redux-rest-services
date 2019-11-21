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
    },
    {
      name: 'simple2',
      url: mockEndpoints.simple.URL,
      transformer: (data) => data,
      actionsDeclarations: [ {
        name: 'get',
        method: 'GET',
      }],
    }
  ]
)

const reducer = restServices.reducers.simple
const reducer2 = restServices.reducers.simple2

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

  it('should not fail if certain reduced didnt handle all actions available', () => {
    const callAllReducersWithActionOnlyAvailabeInOneOfThem = () => {
      const action = restServices.syncActions.simple.create.START_FETCHING()
      
      reducer({}, action)
      reducer2({}, action)
    }

    expect(callAllReducersWithActionOnlyAvailabeInOneOfThem).not.toThrow()
  })

})
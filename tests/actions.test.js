import makeRestServices, { crudActionsDeclarations } from '../src/index'
import mockEndpoints from './mockEndpoints'
import mockFetch from './mockFetch'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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
      name: 'error',
      url: mockEndpoints.error.URL,
      transformer: (data) => data,
      actionsDeclarations: crudActionsDeclarations,
    }
  ],
  mockFetch
)

// MOCK STORE INIT

const middlewares = [thunk]
const createMockStore = configureStore(middlewares)
const mockStore = createMockStore()

// TESTS

describe('dispatched sync actions for', () => {

  beforeEach(() => mockStore.clearActions())

  it('success "create" action call', () => {
    expect.assertions(1)

    return mockStore.dispatch(restServices.actions.simple.create())
      .then(() => {
        const expectedActionTypes = mockStore.getActions().map(action => action.type)
        expect(expectedActionTypes).toEqual([
          restServices.actionTypes.simple.create.START_FETCHING,
          restServices.actionTypes.simple.create.RECEIVES_DATA,
          restServices.actionTypes.simple.create.STOP_FETCHING,
        ])
      })
  })

  it('failed "create" action call', () => {
    expect.assertions(1)

    return mockStore.dispatch(restServices.actions.error.create())
      .catch(() => {
        const expectedActionTypes = mockStore.getActions().map(action => action.type)
        expect(expectedActionTypes).toEqual([
          restServices.actionTypes.error.create.START_FETCHING,
          restServices.actionTypes.error.create.ERROR,
          restServices.actionTypes.error.create.STOP_FETCHING,
        ])
      })
  })

})
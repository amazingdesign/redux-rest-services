import makeRestServices, { crudActionsDeclarations } from '../src/index'
import mockEndpoints from './mockEndpoints'
import mockFetch from './mockFetch'

import { createStore, combineReducers, applyMiddleware } from 'redux'
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

// STORE INIT

const reducer = combineReducers({
  ...restServices.reducers
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

// TESTS

describe('updates state properly for ', () => {

  it('success "create" action call', () => {
    expect.assertions(9)
    
    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'create'

    const getState = () => store.getState()[SERVICE_NAME]

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME]())

    expect(getState().isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].touched).not.toBe(null)

    return promise.then(() => {
      expect(getState().isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isError).toBe(false)

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints.simple.responses.POST)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints.simple.responses.POST)
    })
  })

  it('success "get" action call', () => {
    expect.assertions(9)
    
    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'get'

    const getState = () => store.getState()[SERVICE_NAME]

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME]())

    expect(getState().isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].touched).not.toBe(null)

    return promise.then(() => {
      expect(getState().isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isError).toBe(false)

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints.simple.responses.GET)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints.simple.responses.GET)
    })
  })

  it('success "find" action call', () => {
    expect.assertions(9)
    
    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'find'

    const getState = () => store.getState()[SERVICE_NAME]

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME]())

    expect(getState().isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].touched).not.toBe(null)

    return promise.then(() => {
      expect(getState().isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isError).toBe(false)

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints.simple.responses.GET)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints.simple.responses.GET)
    })
  })

  it('success "update" action call', () => {
    expect.assertions(9)
    
    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'update'

    const getState = () => store.getState()[SERVICE_NAME]

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME]())

    expect(getState().isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].touched).not.toBe(null)

    return promise.then(() => {
      expect(getState().isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isError).toBe(false)

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints.simple.responses.PUT)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints.simple.responses.PUT)
    })
  })

  it('success "delete" action call', () => {
    expect.assertions(9)
    
    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'delete'

    const getState = () => store.getState()[SERVICE_NAME]

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME]())

    expect(getState().isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].touched).not.toBe(null)

    return promise.then(() => {
      expect(getState().isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isError).toBe(false)

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints.simple.responses.DELETE)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints.simple.responses.DELETE)
    })
  })

})
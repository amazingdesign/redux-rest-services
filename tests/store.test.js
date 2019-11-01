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
      name: 'simpleWithId',
      url: mockEndpoints.simpleWithId.URL,
      transformer: (data) => data,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithIdAndOtherParam',
      url: mockEndpoints.simpleWithIdAndOtherParam.URL,
      transformer: (data) => data,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithQueryString',
      url: mockEndpoints.simpleWithQueryString.URL,
      transformer: (data) => data,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithIdAndQueryString',
      url: mockEndpoints.simpleWithIdAndQueryString.URL,
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

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses.POST)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses.POST)
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

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses.GET)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses.GET)
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

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses.GET)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses.GET)
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

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses.PUT)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses.PUT)
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

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses.DELETE)
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses.DELETE)
    })
  })

  it('success "get" action call with one param', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simpleWithId'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123 }

    const getState = () => store.getState()[SERVICE_NAME]

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME](PARAMS))

    expect(getState().isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].touched).not.toBe(null)

    return promise.then(() => {
      expect(getState().isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isError).toBe(false)

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses[ACTION_NAME.toUpperCase()])
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses[ACTION_NAME.toUpperCase()])
    })
  })

  it('success "get" action call with two params', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simpleWithIdAndOtherParam'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123, 'other-param': 'other-value' }

    const getState = () => store.getState()[SERVICE_NAME]

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME](PARAMS))

    expect(getState().isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].touched).not.toBe(null)

    return promise.then(() => {
      expect(getState().isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isError).toBe(false)

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses[ACTION_NAME.toUpperCase()])
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses[ACTION_NAME.toUpperCase()])
    })
  })

  it('success "get" action call with query string', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simpleWithQueryString'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123, 'other-param': 'other-value' }

    const getState = () => store.getState()[SERVICE_NAME]

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME](PARAMS))

    expect(getState().isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].touched).not.toBe(null)

    return promise.then(() => {
      expect(getState().isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isError).toBe(false)

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses[ACTION_NAME.toUpperCase()])
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses[ACTION_NAME.toUpperCase()])
    })
  })

  it('success "get" action call with query string and param', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simpleWithIdAndQueryString'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123, 'other-param': 'other-value' }

    const getState = () => store.getState()[SERVICE_NAME]

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME](PARAMS))

    expect(getState().isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(true)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].touched).not.toBe(null)

    return promise.then(() => {
      expect(getState().isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isLoading).toBe(false)
      expect(getState()[ACTION_NAME].isError).toBe(false)

      expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses[ACTION_NAME.toUpperCase()])
      expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses[ACTION_NAME.toUpperCase()])
    })
  })

})
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
      transformer: (data) => data && data.data,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithId',
      url: mockEndpoints.simpleWithId.URL,
      transformer: (data) => data && data.data,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithIdAndOtherParam',
      url: mockEndpoints.simpleWithIdAndOtherParam.URL,
      transformer: (data) => data && data.data,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithQueryString',
      url: mockEndpoints.simpleWithQueryString.URL,
      transformer: (data) => data && data.data,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithIdAndQueryString',
      url: mockEndpoints.simpleWithIdAndQueryString.URL,
      transformer: (data) => data && data.data,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'error',
      url: mockEndpoints.error.URL,
      transformer: (data) => data && data.data,
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

const dispatchActionAndCheckStateChanges = (SERVICE_NAME, ACTION_NAME, METHOD_NAME, PRAMS) => {
  const getState = () => store.getState()[SERVICE_NAME]

  const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME](PRAMS))

  expect(getState().isLoading).toBe(true)
  expect(getState()[ACTION_NAME].isLoading).toBe(true)
  expect(getState()[ACTION_NAME].isError).toBe(false)
  expect(getState()[ACTION_NAME].touched).not.toBe(null)

  return promise.then(() => {
    expect(getState().isLoading).toBe(false)
    expect(getState()[ACTION_NAME].isLoading).toBe(false)
    expect(getState()[ACTION_NAME].isError).toBe(false)

    expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses[METHOD_NAME].data)
    expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses[METHOD_NAME].data)
  })
}

describe('updates state properly for ', () => {

  it('success "create" action call', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'create'
    const METHOD_NAME = 'POST'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('success "get" action call', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'get'
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('success "find" action call', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'find'
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('success "update" action call', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'update'
    const METHOD_NAME = 'PUT'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('success "delete" action call', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'delete'
    const METHOD_NAME = 'DELETE'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('success "get" action call with one param', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simpleWithId'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123 }
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME, PARAMS)
  })

  it('success "get" action call with two params', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simpleWithIdAndOtherParam'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123, 'other-param': 'other-value' }
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME, PARAMS)
  })

  it('success "get" action call with query string', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simpleWithQueryString'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123, 'other-param': 'other-value' }
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME, PARAMS)
  })

  it('success "get" action call with query string and param', () => {
    expect.assertions(9)

    const SERVICE_NAME = 'simpleWithIdAndQueryString'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123, 'other-param': 'other-value' }
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME, PARAMS)
  })

})
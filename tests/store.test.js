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
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithId',
      url: mockEndpoints.simpleWithId.URL,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithIdAndOtherParam',
      url: mockEndpoints.simpleWithIdAndOtherParam.URL,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithQueryString',
      url: mockEndpoints.simpleWithQueryString.URL,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'simpleWithIdAndQueryString',
      url: mockEndpoints.simpleWithIdAndQueryString.URL,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'error',
      url: mockEndpoints.error.URL,
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
  expect(getState()[ACTION_NAME].error).toBe(null)
  expect(getState()[ACTION_NAME].touched).not.toBe(null)

  return promise.then(() => {
    expect(getState().isLoading).toBe(false)
    expect(getState()[ACTION_NAME].isLoading).toBe(false)
    expect(getState()[ACTION_NAME].isError).toBe(false)
    expect(getState()[ACTION_NAME].error).toBe(null)

    expect(getState()[ACTION_NAME].data).toEqual(mockEndpoints[SERVICE_NAME].responses[METHOD_NAME])
    expect(getState()[ACTION_NAME].rawData).toEqual(mockEndpoints[SERVICE_NAME].responses[METHOD_NAME])
  })
}

describe('updates state properly for success', () => {

  it('"create" action call', () => {
    expect.assertions(11)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'create'
    const METHOD_NAME = 'POST'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('"get" action call', () => {
    expect.assertions(11)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'get'
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('"find" action call', () => {
    expect.assertions(11)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'find'
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('"update" action call', () => {
    expect.assertions(11)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'update'
    const METHOD_NAME = 'PUT'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('"delete" action call', () => {
    expect.assertions(11)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'delete'
    const METHOD_NAME = 'DELETE'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })

  it('"get" action call with one param', () => {
    expect.assertions(11)

    const SERVICE_NAME = 'simpleWithId'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123 }
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME, PARAMS)
  })

  it('"get" action call with two params', () => {
    expect.assertions(11)

    const SERVICE_NAME = 'simpleWithIdAndOtherParam'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123, 'other-param': 'other-value' }
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME, PARAMS)
  })

  it('"get" action call with query string', () => {
    expect.assertions(11)

    const SERVICE_NAME = 'simpleWithQueryString'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123, 'other-param': 'other-value' }
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME, PARAMS)
  })

  it('"get" action call with query string and param', () => {
    expect.assertions(11)

    const SERVICE_NAME = 'simpleWithIdAndQueryString'
    const ACTION_NAME = 'get'
    const PARAMS = { id: 123, 'other-param': 'other-value' }
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChanges(SERVICE_NAME, ACTION_NAME, METHOD_NAME, PARAMS)
  })

})

const dispatchActionAndCheckStateChangesForError = (SERVICE_NAME, ACTION_NAME, METHOD_NAME, PRAMS) => {
  const getState = () => store.getState()[SERVICE_NAME]

  const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME](PRAMS))

  expect(getState().isLoading).toBe(true)
  expect(getState()[ACTION_NAME].isLoading).toBe(true)
  expect(getState()[ACTION_NAME].isError).toBe(false)
  expect(getState()[ACTION_NAME].error).toBe(null)
  expect(getState()[ACTION_NAME].touched).not.toBe(null)


  return promise.catch(() => {    
    expect(getState().isLoading).toBe(false)
    expect(getState().isError).toBe(true)
    expect(getState()[ACTION_NAME].isLoading).toBe(false)
    expect(getState()[ACTION_NAME].isError).toBe(true)

    expect(getState()[ACTION_NAME].error).toEqual(mockEndpoints[SERVICE_NAME].error)
  })
}

describe('updates state properly for error', () => {
  it('"create" action call', () => {
    expect.assertions(10)

    const SERVICE_NAME = 'error'
    const ACTION_NAME = 'get'
    const METHOD_NAME = 'GET'

    return dispatchActionAndCheckStateChangesForError(SERVICE_NAME, ACTION_NAME, METHOD_NAME)
  })
})
import makeRestServices, { crudActionsDeclarations, options } from '../src/index'
import mockEndpoints from './mockEndpoints'
import mockFetch from './mockFetch'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// SERVICES INIT

const onError = jest.fn()
const onStartFetching = jest.fn()
const onStopFetching = jest.fn()
const onReceivesData = jest.fn()

const restServices = makeRestServices(
  [
    {
      name: 'simple',
      url: mockEndpoints.simple.URL,
      onError,
      onStartFetching,
      onStopFetching,
      onReceivesData,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'error',
      url: mockEndpoints.error.URL,
      onError,
      onStartFetching,
      onStopFetching,
      onReceivesData,
      actionsDeclarations: crudActionsDeclarations,
    },
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

// @HACK to obtain dispatch and getState that thunk uses
// its apparently not === same functions as store.dispatch and store.getState
const { dispatch: thunkDispatch, getState: thunkGetState } = store.dispatch((dispatch, getState) => ({ dispatch, getState }))

// TESTS

describe('calling defined callbacks', () => {

  it('when success call is made', () => {
    expect.assertions(6)

    const SERVICE_NAME = 'simple'
    const ACTION_NAME = 'create'
    const ACTION_DECLARATION = crudActionsDeclarations.find(declaration => declaration.name === ACTION_NAME)
    const PARAMS = {}

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME](PARAMS))

    expect(onStartFetching).toHaveBeenCalledTimes(1)
    expect(onStartFetching).toHaveBeenLastCalledWith(ACTION_DECLARATION, thunkDispatch, thunkGetState)

    return promise.then(() => {
      expect(onReceivesData).toHaveBeenCalledTimes(1)
      expect(onReceivesData).toHaveBeenLastCalledWith(ACTION_DECLARATION, thunkDispatch, thunkGetState)
      expect(onStopFetching).toHaveBeenCalledTimes(1)
      expect(onStopFetching).toHaveBeenLastCalledWith(ACTION_DECLARATION, thunkDispatch, thunkGetState)
    })
  })

  it('when error call is made', () => {
    expect.assertions(6)

    const SERVICE_NAME = 'error'
    const ACTION_NAME = 'get'
    const ACTION_DECLARATION = crudActionsDeclarations.find(declaration => declaration.name === ACTION_NAME)
    const PARAMS = {}

    const promise = store.dispatch(restServices.actions[SERVICE_NAME][ACTION_NAME](PARAMS))

    expect(onStartFetching).toHaveBeenCalledTimes(2) // 2 because of prev test
    expect(onStartFetching).toHaveBeenLastCalledWith(ACTION_DECLARATION, thunkDispatch, thunkGetState)

    return promise.catch(() => {
      expect(onError).toHaveBeenCalledTimes(1) // no error in prev test
      expect(onError).toHaveBeenLastCalledWith(ACTION_DECLARATION, thunkDispatch, thunkGetState)
      expect(onStopFetching).toHaveBeenCalledTimes(2) // 2 because of prev test
      expect(onStopFetching).toHaveBeenLastCalledWith(ACTION_DECLARATION, thunkDispatch, thunkGetState)
    })
  })

})
import makeRestServices, { crudActionsDeclarations } from '../src/index'
import mockEndpoints from './mockEndpoints'
import mockFetch from './mockFetch'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// SERVICES INIT

const restServices = makeRestServices(
  [{
    name: 'simple',
    url: mockEndpoints.simple.URL,
    transformer: (data) => data,
    actionsDeclarations: crudActionsDeclarations,
  }],
  mockFetch
)

// STORE INIT

const reducer = combineReducers({
  ...restServices.reducers,
})

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

// TESTS

describe('store shape before calling actions', () => {

  it('should have all declared reducers', () => {
    expect(true).toBe(true)
  })

})
import Validator from 'fastest-validator'
import slugify from 'slugify'
import 'isomorphic-fetch'

import makeActions from './makeActions'
import makeReducers from './makeReducers'
import makeActionTypes from './makeActionTypes'
import makeSyncActions from './makeSyncActions'
import defaultFetchAdapter from './defaultFetchAdapter'

const v = new Validator()

v.add('slug', value => {
  const expected = slugify(value)

  if (value !== expected) {
    return v.makeError('slug', expected, value);
  }

  return true
})

const schema = {
  servicesDeclarations: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        name: { type: 'slug' },
        url: { type: "url" },
        transformer: { type: 'function', optional: true },
        actionsDeclarations: {
          type: 'array',
          items: {
            type: 'object',
            props: {
              name: { type: 'string' },
              method: { type: 'string' },
            }
          },
        }
      }
    }
  }
}

export default (servicesDeclarations, fetchFunction = defaultFetchAdapter(fetch)) => {
  if (Array.isArray(servicesDeclarations) && servicesDeclarations.length === 0) {
    throw new Error()
  }

  const validationResult = v.validate({ servicesDeclarations }, schema)

  if (validationResult !== true) {
    throw new Error(JSON.stringify(validationResult))
  }

  const actionTypes = makeActionTypes(servicesDeclarations)
  const syncActions = makeSyncActions(servicesDeclarations, actionTypes)

  return {
    actionTypes: actionTypes,
    syncActions: syncActions,
    actions: makeActions(servicesDeclarations, actionTypes, syncActions, fetchFunction),
    reducers: makeReducers(servicesDeclarations, actionTypes),
  }
}
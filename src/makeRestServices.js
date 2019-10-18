import Validator from 'fastest-validator'
import slugify from 'slugify'

import makeActions from './makeActions'
import makeReducers from './makeReducers'

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
        transformer: { type: 'function', optional: true }
      }
    }
  }
}

export default (servicesDeclarations) => {
  if (Array.isArray(servicesDeclarations) && servicesDeclarations.length === 0) {
    throw new Error()
  }

  const validationResult = v.validate({ servicesDeclarations }, schema)

  if (validationResult !== true) {
    throw new Error(JSON.stringify(validationResult))
  }

  return {
    actions: makeActions(servicesDeclarations),
    reducers: makeReducers(servicesDeclarations),
  }
}
import { makeRestServices, crudActionsDeclarations, options, instances } from '../src/index'
import mockEndpoints from './mockEndpoints'

describe('exposing instances works', () => {
  const servicesDeclarations = [{
    name: 'first',
    url: mockEndpoints.simple.URL,
    actionsDeclarations: crudActionsDeclarations,
  }]

  it('first instance is accessible', () => {
    const instance = makeRestServices(servicesDeclarations)

    expect(instance).toBe(instances[0])
  })
  it('second instance is accessible', () => {
    const instance = makeRestServices(servicesDeclarations)

    expect(instance).toBe(instances[1])
  })
  it('third instance is not first or second', () => {
    const instance = makeRestServices(servicesDeclarations)

    expect(instance).not.toBe(instances[0])
    expect(instance).not.toBe(instances[1])
    expect(instance).toBe(instances[2])
  })
})

describe('making rest services declarations', () => {

  it('throws on no services passed', () => {
    expect(() => makeRestServices([])).toThrow()
  })

  it('throws on wrong service name passed', () => {
    expect(() => makeRestServices([{
      name: 'It is wrong name, it should be an url slug',
      url: mockEndpoints.simple.URL,
      transformer: (data) => data,
      actionsDeclarations: crudActionsDeclarations,
    }])).toThrow()
  })

  it('throws on invalid url passed', () => {
    expect(() => makeRestServices([{
      name: 'invalid',
      url: 'example.com/api/invalid-url',
      transformer: (data) => data,
      actionsDeclarations: crudActionsDeclarations,
    }])).toThrow()
  })

  it('throws on no actions passed', () => {
    expect(() => makeRestServices([{
      name: 'simple',
      url: mockEndpoints.simple.URL,
      transformer: (data) => data,
    }])).toThrow()
  })

  it('throws on wrong (lack of method and name) actions passed', () => {
    expect(() => makeRestServices([{
      name: 'simple',
      url: mockEndpoints.simple.URL,
      transformer: (data) => data,
      actionsDeclarations: [{}],
    }])).toThrow()
  })

  it('do not throws on no transformer passed', () => {
    expect(() => makeRestServices([{
      name: 'simple',
      url: mockEndpoints.simple.URL,
      actionsDeclarations: crudActionsDeclarations,
    }])).not.toThrow()
  })

  it('returns object with reducers and actions', () => {
    expect(makeRestServices([{
      name: 'simple',
      url: mockEndpoints.simple.URL,
      actionsDeclarations: crudActionsDeclarations,
    }])).toEqual({
      actionTypes: {
        simple: crudActionsDeclarations.reduce((r, crudAction) => ({ ...r, [crudAction.name]: options.STATES.reduce((r, stateName) => ({ ...r, [stateName]: expect.any(String) }), {}) }), {}),
      },
      syncActions: {
        simple: crudActionsDeclarations.reduce((r, crudAction) => ({ ...r, [crudAction.name]: options.STATES.reduce((r, stateName) => ({ ...r, [stateName]: expect.any(Function) }), {}) }), {}),
      },
      actions: {
        simple: crudActionsDeclarations.reduce((r, crudAction) => ({ ...r, [crudAction.name]: expect.any(Function) }), {}),
      },
      reducers: {
        simple: expect.any(Function),
      },
    })
  })

})


import makeRestServices, { crudActionsDeclarations } from '../src/index'
import mockEndpoints from './mockEndpoints'

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
        simple: crudActionsDeclarations.reduce((r, crudAction) => ({ ...r, [crudAction.name]: expect.any(String) }), {}),
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
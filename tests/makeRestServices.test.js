import makeRestServices, { crudActions } from '../src/index'

describe('making object with rest services', () => {

  it('throws on no services passed', () => {
    expect(() => makeRestServices([])).toThrow()
  })

  it('throws on wrong service name passed', () => {
    expect(() => makeRestServices([{
      name: 'It is wrong name, it should be an url slug',
      url: 'https://example.com/api/simple',
      transformer: (data) => data,
      actions: crudActions,
    }])).toThrow()
  })

  it('throws on invalid url passed', () => {
    expect(() => makeRestServices([{
      name: 'invalid',
      url: 'example.com/api/invalid-url',
      transformer: (data) => data,
      actions: crudActions,
    }])).toThrow()
  })

  it('throws on no actions passed', () => {
    expect(() => makeRestServices([{
      name: 'simple',
      url: 'https://example.com/api/simple',
      transformer: (data) => data,
    }])).toThrow()
  })

  it('throws on wrong (lack of method and name) actions passed', () => {
    expect(() => makeRestServices([{
      name: 'simple',
      url: 'https://example.com/api/simple',
      transformer: (data) => data,
      actions: [ { } ],
    }])).toThrow()
  })

  it('do not throws on no transformer passed', () => {
    expect(() => makeRestServices([{
      name: 'simple',
      url: 'https://example.com/api/simple',
      actions: crudActions,
    }])).not.toThrow()
  })

  it('returns object with reducers and actions', () => {
    expect(makeRestServices([{
      name: 'simple',
      url: 'https://example.com/api/simple',
      actions: crudActions,
    }])).toEqual({
      actionTypes: {
        simple:  expect.any(Object),
      },
      actions: {
        simple:  expect.any(Function),
      },
      reducers: {
        simple:  expect.any(Function),
      },
    })
  })

})
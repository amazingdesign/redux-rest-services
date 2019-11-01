import replaceParamsInURL from '../src/replaceParamsInURL'

describe('replaces params', () => {

  it('when is one param in URL and one in params object', () => {
    const {url, params} = replaceParamsInURL(
      'https://google.com/:id',
      { id: '123' }
    )

    expect(url).toBe('https://google.com/123')
    expect(params).toEqual({})
  })

  it('when are two params in URL and two in params object', () => {
    const {url, params} = replaceParamsInURL(
      'https://google.com/:id/:other',
      { id: '123', other: 'some-param' }
    )

    expect(url).toBe('https://google.com/123/some-param')
    expect(params).toEqual({})
  })

  it('when are param have "-" in name', () => {
    const {url, params} = replaceParamsInURL(
      'https://google.com/:user-id',
      { 'user-id': '123' }
    )

    expect(url).toBe('https://google.com/123')
    expect(params).toEqual({})
  })

  it('when are param have "_" in name', () => {
    const {url, params} = replaceParamsInURL(
      'https://google.com/:user_id',
      { 'user_id': '123' }
    )

    expect(url).toBe('https://google.com/123')
    expect(params).toEqual({})
  })

})

describe('do nothing', () => {

  it('when is no params in URL but they are in params object', () => {
    const {url, params} = replaceParamsInURL(
      'https://google.com',
      { 'user_id': '123' }
    )

    expect(url).toBe('https://google.com')
    expect(params).toEqual({ 'user_id': '123' })
  })

  it('when is no params in URL and is empty params object', () => {
    const {url, params} = replaceParamsInURL(
      'https://google.com',
      { }
    )

    expect(url).toBe('https://google.com')
    expect(params).toEqual({})
  })

  it('when is no params in URL and is no params object', () => {
    const {url, params} = replaceParamsInURL(
      'https://google.com'
    )

    expect(url).toBe('https://google.com')
    expect(params).toBe(undefined)
  })

})

describe('adds undefined', () => {

  it('when there are URL params but arent in object', () => {
    const {url, params} = replaceParamsInURL(
      'https://google.com/:id',
      { }
    )

    expect(url).toBe('https://google.com/undefined')
    expect(params).toEqual({})
  })

  it('when there are URL params but are no object', () => {
    const {url, params} = replaceParamsInURL(
      'https://google.com/:id'
    )

    expect(url).toBe('https://google.com/undefined')
    expect(params).toBe(undefined)
  })

})
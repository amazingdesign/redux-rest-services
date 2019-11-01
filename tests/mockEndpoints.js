export default {
  simple: {
    URL: 'https://example.com/api/simple',
    responses: {
      GET: { data: 'Some random GET response from https://example.com/api/simple' },
      POST: { data: 'Some random POST response from https://example.com/api/simple' },
      PUT: { data: 'Some random PUT response from https://example.com/api/simple' },
      PATCH: { data: 'Some random PATCH response from https://example.com/api/simple' },
      DELETE: { data: 'Some random DELETE response from https://example.com/api/simple' },
    }
  },
  simpleWithId: {
    URL: 'https://example.com/api/simple/:id',
    URLWithParams: 'https://example.com/api/simple/123',
    responses: {
      GET: { data: 'Some random GET response from https://example.com/api/simple/123' },
      POST: { data: 'Some random POST response from https://example.com/api/simple/123' },
      PUT: { data: 'Some random PUT response from https://example.com/api/simple/123' },
      PATCH: { data: 'Some random PATCH response from https://example.com/api/simple/123' },
      DELETE: { data: 'Some random DELETE response from https://example.com/api/simple/123' },
    }
  },
  simpleWithIdAndOtherParam: {
    URL: 'https://example.com/api/simple/:id/:other-param',
    URLWithParams: 'https://example.com/api/simple/123/other-value',
    responses: {
      GET: { data: 'Some random GET response from https://example.com/api/simple/123/other-value' },
      POST: { data: 'Some random POST response from https://example.com/api/simple/123/other-value' },
      PUT: { data: 'Some random PUT response from https://example.com/api/simple/123/other-value' },
      PATCH: { data: 'Some random PATCH response from https://example.com/api/simple/123/other-value' },
      DELETE: { data: 'Some random DELETE response from https://example.com/api/simple/123/other-value' },
    }
  },
  simpleWithQueryString: {
    URL: 'https://example.com/api/simple',
    URLWithParams: 'https://example.com/api/simple?id=123&other-param=other-value',
    responses: {
      GET: { data: 'Some random GET response from https://example.com/api/simple?id=123&other-param=other-value' },
      POST: { data: 'Some random POST response from https://example.com/api/simple?id=123&other-param=other-value' },
      PUT: { data: 'Some random PUT response from https://example.com/api/simple?id=123&other-param=other-value' },
      PATCH: { data: 'Some random PATCH response from https://example.com/api/simple?id=123&other-param=other-value' },
      DELETE: { data: 'Some random DELETE response from https://example.com/api/simple?id=123&other-param=other-value' },
    }
  },
  simpleWithIdAndQueryString: {
    URL: 'https://example.com/api/simple/:id',
    URLWithParams: 'https://example.com/api/simple/123?other-param=other-value',
    responses: {
      GET: { data: 'Some random GET response from https://example.com/api/simple/123?other-param=other-value' },
      POST: { data: 'Some random POST response from https://example.com/api/simple/123?other-param=other-value' },
      PUT: { data: 'Some random PUT response from https://example.com/api/simple/123?other-param=other-value' },
      PATCH: { data: 'Some random PATCH response from https://example.com/api/simple/123?other-param=other-value' },
      DELETE: { data: 'Some random DELETE response from https://example.com/api/simple/123?other-param=other-value' },
    }
  },
  error: {
    URL: 'https://example.com/api/error',
  }
}
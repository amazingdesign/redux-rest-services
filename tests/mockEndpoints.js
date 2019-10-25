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
  error: {
    URL: 'https://example.com/api/error',
  }
}
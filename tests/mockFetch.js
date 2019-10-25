import mockEndpoints from './mockEndpoints'

export default (url, opt = { method: 'GET' }) => {
  switch (url) {
    case mockEndpoints.simple.URL:
      return Promise.resolve(mockEndpoints.simple.responses[opt.method])
    case mockEndpoints.error.URL:
      return Promise.reject('Error URL called')
    default:
      return Promise.reject('URL not resolved!')
  }
}
import mockEndpoints from './mockEndpoints'

export default (url, opt = { method: 'GET' }) => {
  switch (url) {
    case mockEndpoints.simple.URL:
      return Promise.resolve(mockEndpoints.simple.responses[opt.method])
    case mockEndpoints.simpleWithId.URLWithParams:
      return Promise.resolve(mockEndpoints.simpleWithId.responses[opt.method])
    case mockEndpoints.simpleWithIdAndOtherParam.URLWithParams:
      return Promise.resolve(mockEndpoints.simpleWithIdAndOtherParam.responses[opt.method])
    case mockEndpoints.simpleWithQueryString.URLWithParams:
      return Promise.resolve(mockEndpoints.simpleWithQueryString.responses[opt.method])
    case mockEndpoints.simpleWithIdAndQueryString.URLWithParams:
      return Promise.resolve(mockEndpoints.simpleWithIdAndQueryString.responses[opt.method])
    case mockEndpoints.error.URL:
      return Promise.reject(mockEndpoints.error.error)
    default:
      return Promise.reject('URL not resolved!')
  }
}
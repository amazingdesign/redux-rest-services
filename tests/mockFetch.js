import mockEndpoints from './mockEndpoints'

export default (url, opt) => {
  switch (url) {
    case mockEndpoints.simple.URL:
      return Promise.resolve(mockEndpoints.simple.responses[opt.method])
    default:
      return Promise.reject('URL not resolved!')
  }
}
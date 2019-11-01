const REGEX = /\/:([0-9A-Za-z-_]+)/g

export default (url, params) => {
  const matchIterator = url.matchAll(REGEX)
  const paramsCopy = params && JSON.parse(JSON.stringify(params))

  for (const match of matchIterator) {
    const paramName = match[1]


    if (paramsCopy && paramsCopy[paramName]) {
      url = url.replace(':' + paramName, paramsCopy && paramsCopy[paramName])
      delete paramsCopy[paramName]
    } else {
      url = url.replace('/:' + paramName, '')
    }
  }

  return {
    url,
    params: paramsCopy
  }
}
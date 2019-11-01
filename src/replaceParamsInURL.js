const REGEX = /\/:([0-9A-Za-z-_]+)/g

export default (url, params) => {
  const matchIterator = url.matchAll(REGEX)
  const paramsCopy = params && JSON.parse(JSON.stringify(params))

  for (const match of matchIterator) {
    const paramName = match[1]

    url = url.replace(':' + paramName, paramsCopy && paramsCopy[paramName])

    if (paramsCopy && paramsCopy[paramName]) {
      delete paramsCopy[paramName]
    }
  }

  return {
    url,
    params: paramsCopy
  }
}
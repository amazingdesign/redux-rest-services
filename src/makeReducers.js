const makeReducer = (serviceDeclaration) => {
  const initialState = {}
  return (state = initialState, action) => {
    return state
  }
}

export default (servicesDeclarations, actionTypes) => {
  return servicesDeclarations.reduce(
    (r, serviceDeclaration, i) => ({
      ...r,
      [serviceDeclaration.name]: makeReducer(serviceDeclaration),
    }),
    {}
  )
}
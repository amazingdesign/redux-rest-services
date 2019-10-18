const makeReducer = (serviceDeclaration) => {
  return () => { }
}

export default (servicesDeclarations) => {
  return servicesDeclarations.reduce(
    (r, serviceDeclaration, i) => ({
      ...r,
      [serviceDeclaration.name]: makeReducer(serviceDeclaration),
    }),
    {}
  )
}
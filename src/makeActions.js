const makeAction = (serviceDeclaration) => {
  return () => { }
}

export default (servicesDeclarations, actionTypes) => {
  return servicesDeclarations.reduce(
    (r, serviceDeclaration, i) => ({
      ...r,
      [serviceDeclaration.name]: makeAction(serviceDeclaration),
    }),
    {}
  )
}
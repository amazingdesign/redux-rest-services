const makeAction = (actionDeclaration) => {
  return () => { }
}

const makeActions = (serviceDeclaration) => {
  return serviceDeclaration.actionsDeclarations.reduce(
    (r, actionDeclaration, i) => ({
      ...r,
      [actionDeclaration.name]: makeAction(actionDeclaration),
    }),
    {}
  )
}

export default (servicesDeclarations, actionTypes) => {
  return servicesDeclarations.reduce(
    (r, serviceDeclaration, i) => ({
      ...r,
      [serviceDeclaration.name]: makeActions(serviceDeclaration),
    }),
    {}
  )
}
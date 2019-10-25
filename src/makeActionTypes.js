const PREFIX = '@redux-rest-services'

const makeActionType = (serviceName, methodName) => {
  return `${PREFIX}/${serviceName}/${methodName}`
}

const makeActionTypes = (serviceDeclaration) => {
  return serviceDeclaration.actionsDeclarations.reduce(
    (r, actionDeclaration, i) => ({
      ...r,
      [actionDeclaration.name]: makeActionType(serviceDeclaration.name, actionDeclaration.method),
    }),
    {}
  )
}

export default (servicesDeclarations) => {
  return servicesDeclarations.reduce(
    (r, serviceDeclaration, i) => ({
      ...r,
      [serviceDeclaration.name]: makeActionTypes(serviceDeclaration),
    }),
    {}
  )
}
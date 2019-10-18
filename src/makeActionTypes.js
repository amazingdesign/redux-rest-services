const PREFIX = '@redux-rest-services'

const makeActionType = (serviceName, methodName) => {
  return `${PREFIX}/${serviceName}/${methodName}`
}

const makeActionTypes = (serviceDeclaration) => {
  return serviceDeclaration.actions.reduce(
    (r, action, i) => ({
      ...r,
      [action.name]: makeActionType(serviceDeclaration.name, action),
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
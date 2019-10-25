import { PREFIX, STATES } from './options'

const makeActionType = (serviceName, actionName, stateName) => {
  return `${PREFIX}/${serviceName}/${actionName}/${stateName}`
}

const makeActionTypesForActionName = (serviceName, actionName) => {
  return STATES.reduce(
    (r, stateName, i) => ({
      ...r,
      [stateName]: makeActionType(serviceName, actionName, stateName),
    }),
    {}
  )
}

const makeActionTypesForServiceName = (serviceDeclaration) => {
  return serviceDeclaration.actionsDeclarations.reduce(
    (r, actionDeclaration, i) => ({
      ...r,
      [actionDeclaration.name]: makeActionTypesForActionName(serviceDeclaration.name, actionDeclaration.name),
    }),
    {}
  )
}

export default (servicesDeclarations) => {
  return servicesDeclarations.reduce(
    (r, serviceDeclaration, i) => ({
      ...r,
      [serviceDeclaration.name]: makeActionTypesForServiceName(serviceDeclaration),
    }),
    {}
  )
}
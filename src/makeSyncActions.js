import { STATES } from './options'

const makeSyncAction = (serviceDeclaration, actionDeclaration, type) => (data) => ({
  type,
  data,
  serviceDeclaration,
  actionDeclaration,
})

const makeSyncActionsForActionDeclaration = (serviceDeclaration, actionDeclaration, actionTypesForActionDeclaration) => {
  return STATES.reduce(
    (r, stateName, i) => ({
      ...r,
      [stateName]: makeSyncAction(serviceDeclaration, actionDeclaration, actionTypesForActionDeclaration[stateName]),
    }),
    {}
  )
}

const makeSyncActionsForService = (serviceDeclaration, actionTypesForService) => {
  return serviceDeclaration.actionsDeclarations.reduce(
    (r, actionDeclaration, i) => ({
      ...r,
      [actionDeclaration.name]: makeSyncActionsForActionDeclaration(serviceDeclaration, actionDeclaration, actionTypesForService[actionDeclaration.name]),
    }),
    {}
  )
}

export default (servicesDeclarations, actionTypes) => {
  return servicesDeclarations.reduce(
    (r, serviceDeclaration, i) => ({
      ...r,
      [serviceDeclaration.name]: makeSyncActionsForService(serviceDeclaration, actionTypes[serviceDeclaration.name]),
    }),
    {}
  )
}
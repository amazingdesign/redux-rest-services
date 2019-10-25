const makeAction = (serviceDeclaration, actionDeclaration, actionTypesForActionDeclaration, syncActionsForActionDeclaration, fetchFunction) => {
  return () => (dispatch, getState) => {
    dispatch(syncActionsForActionDeclaration.START_FETCHING())

    const actionDeclarationWithoutName = Object.entries(actionDeclaration).reduce(
      (r, { key, val }) => key !== 'name' ? { ...r, [key]: val } : r,
      {}
    )

    return fetchFunction(
      serviceDeclaration.url,
      actionDeclarationWithoutName,
    )
      .then((data) => {
        dispatch(syncActionsForActionDeclaration.RECEIVES_DATA())
      })
      .catch((error) => {
        dispatch(syncActionsForActionDeclaration.ERROR())
      })
      .finally(() => {
        dispatch(syncActionsForActionDeclaration.STOP_FETCHING())
      })

  }
}

const makeActions = (serviceDeclaration, actionTypesForService, syncActionsForService, fetchFunction) => {
  return serviceDeclaration.actionsDeclarations.reduce(
    (r, actionDeclaration, i) => ({
      ...r,
      [actionDeclaration.name]: makeAction(serviceDeclaration, actionDeclaration, actionTypesForService[actionDeclaration.name], syncActionsForService[actionDeclaration.name], fetchFunction),
    }),
    {}
  )
}

export default (servicesDeclarations, actionTypes, syncActions, fetchFunction) => {
  return servicesDeclarations.reduce(
    (r, serviceDeclaration, i) => ({
      ...r,
      [serviceDeclaration.name]: makeActions(serviceDeclaration, actionTypes[serviceDeclaration.name], syncActions[serviceDeclaration.name], fetchFunction),
    }),
    {}
  )
}
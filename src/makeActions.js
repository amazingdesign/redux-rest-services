import qs from 'qs'

import replaceParamsInURL from './replaceParamsInURL'

const makeAction = (serviceDeclaration, actionDeclaration, actionTypesForActionDeclaration, syncActionsForActionDeclaration, fetchFunction) => {
  return (params, fetchOptions) => (dispatch, getState) => {
    dispatch(syncActionsForActionDeclaration.START_FETCHING())

    const actionDeclarationWithoutName = Object.entries(actionDeclaration).reduce(
      (r, [key, val]) => key !== 'name' ? { ...r, [key]: val } : r,
      {}
    )

    const fetchOptionsFromActionDeclarationAndActionCall = {
      ...actionDeclarationWithoutName,
      ...fetchOptions,
    }

    const url = serviceDeclaration.url
    const { url: urlWithParamsFilled, params: paramsWithoutUrlOnes } = replaceParamsInURL(
      url,
      params,
    )

    const queryString = qs.stringify(paramsWithoutUrlOnes)

    const urlWithParamsFilledAndQueryString = urlWithParamsFilled + (queryString ? '?' + queryString : '')

    return fetchFunction(
      urlWithParamsFilledAndQueryString,
      fetchOptionsFromActionDeclarationAndActionCall,
    )
      .then((data) => {
        let dataToDispatch = data
        if(typeof serviceDeclaration.transformer === 'function'){
          const transformer = serviceDeclaration.transformer
          dataToDispatch = transformer(data, actionDeclaration)
        }
        dispatch(syncActionsForActionDeclaration.RECEIVES_DATA(dataToDispatch))
      })
      .catch((error) => {
        dispatch(syncActionsForActionDeclaration.ERROR(error))
        return Promise.reject(error)
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
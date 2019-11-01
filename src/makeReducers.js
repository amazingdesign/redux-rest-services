import { SERVICE_INITIAL_STATE, ACTION_INITIAL_STATE } from './options'
import calculateServiceState from './calculateServiceState'

const makeReducer = (serviceDeclaration, actionTypesForService) => {
  const initialState = {
    ...SERVICE_INITIAL_STATE,
    ...serviceDeclaration.actionsDeclarations.reduce(
      (r, actionDeclaration) => ({ ...r, [actionDeclaration.name]: { ...ACTION_INITIAL_STATE } }),
      {}
    )
  }

  return (state = initialState, action) => {
    if (!action) {
      // @TODO - log error in error reducer maybe
      return state
    }

    const actionName = action && action.actionDeclaration && action.actionDeclaration.name

    if (!actionName) {
      // @TODO - log error in error reducer maybe
      return state
    }

    let newActionState = null

    switch (action.type) {
      case actionTypesForService[actionName].START_FETCHING:
        newActionState = {
          [actionName]: {
            ...state[actionName],
            isLoading: true,
            isError: false,
            error: null,
            touched: action.timestamp,
          }
        }
        return calculateServiceState({...state, ...newActionState})
      case actionTypesForService[actionName].STOP_FETCHING:
        newActionState = {
          [actionName]: {
            ...state[actionName],
            isLoading: false,
            touched: action.timestamp,
          }
        }
        return calculateServiceState({...state, ...newActionState})
      case actionTypesForService[actionName].RECEIVES_DATA:
        newActionState = {
          [actionName]: {
            ...state[actionName],
            data: action.data,
            rawData: action.rawData,
            touched: action.timestamp,
          }
        }
        return calculateServiceState({...state, ...newActionState})
      case actionTypesForService[actionName].ERROR:
        newActionState = {
          [actionName]: {
            ...state[actionName],
            isLoading: false,
            isError: true,
            error: action.data,
            touched: action.timestamp,
          }
        }
        return calculateServiceState({...state, ...newActionState})
      default:
        return state
    }
  }
}

export default (servicesDeclarations, actionTypes) => {
  return servicesDeclarations.reduce(
    (r, serviceDeclaration, i) => ({
      ...r,
      [serviceDeclaration.name]: makeReducer(serviceDeclaration, actionTypes[serviceDeclaration.name]),
    }),
    {}
  )
}
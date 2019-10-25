import { SERVICE_INITIAL_STATE, ACTION_INITIAL_STATE } from './options'

export const calculateServiceState = (state) => {
  const stateCopy = JSON.parse(JSON.stringify(state))

  // leave only action related properties, delete global,
  // service related, that will be calculated by this function
  for (let key in SERVICE_INITIAL_STATE) {
    delete stateCopy[key]
  }

  const calculatedGlobalState = Object.entries(stateCopy).reduce(
    (r, [actionName, actionState]) => ({
      ...r,
      isLoading: r.isLoading || actionState.isLoading,
      isError: r.isError || actionState.isError,
      touched: (
        r.touched === null ?
          actionState.touched
          :
          r.touched < actionState.touched ?
            actionState.touched
            :
            r.touched
      )
    }),
    JSON.parse(JSON.stringify(SERVICE_INITIAL_STATE))
  )

  return {
    ...calculatedGlobalState,
    ...stateCopy
  }
}

export default calculateServiceState
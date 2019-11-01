export const PREFIX = '@redux-rest-services'
export const STATES = ['START_FETCHING', 'STOP_FETCHING', 'ERROR', 'RECEIVES_DATA']

export const SERVICE_INITIAL_STATE = {
  isLoading: false,
  isError: false,
  error: null,
  touched: null,
}
export const ACTION_INITIAL_STATE = {
  isLoading: false,
  isError: false,
  touched: null,
  data: {},
  rawData: {},
}

export default {
  PREFIX,
  STATES,
  SERVICE_INITIAL_STATE,
  ACTION_INITIAL_STATE,
}
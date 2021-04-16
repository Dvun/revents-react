const ASYNC_ACTION_START = 'ASYNC_ACTION_START'
const ASYNC_ACTION_FINNISH = 'ASYNC_ACTION_FINNISH'
const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR'
export const APP_LOADED = 'APP_LOADED'

export function asyncActionStart() {
  return ({type: ASYNC_ACTION_START})
}

export function asyncActionFinnish() {
  return ({type: ASYNC_ACTION_FINNISH})
}

export function asyncActionError(error) {
  console.log(error)
  return ({type: ASYNC_ACTION_ERROR, payload: error})
}

const initialState = {
  loading: false,
  error: null,
  initialized: false
}

export const asyncReducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case ASYNC_ACTION_FINNISH:
      return {
        ...state,
        loading: false,
        error: null,
      }

    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }

    case APP_LOADED:
      return {
        ...state,
        initialized: true
      }

    default:
      return state
  }
}
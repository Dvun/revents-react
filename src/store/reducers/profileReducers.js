import * as consts from '../constants/profileConstants'

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null
}

export const profileReducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case consts.LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload
      }

    case consts.LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: payload
      }

    default: return state
  }
}
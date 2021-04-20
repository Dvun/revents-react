import * as consts from '../constants/profileConstants'

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
  profileEvents: [],
  followers: [],
  followings: [],
  followingUser: false,

}

export const profileReducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case consts.LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      }

    case consts.LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: payload,
      }

    case consts.LISTEN_TO_USER_PHOTOS:
      return {
        ...state,
        photos: payload,
      }

    case consts.LISTEN_TO_USER_EVENTS:
      return {
        ...state,
        profileEvents: payload
      }

    case consts.LISTEN_TO_FOLLOWERS:
      return {
        ...state,
        followers: payload
      }

    case consts.LISTEN_TO_FOLLOWINGS:
      return {
        ...state,
        followings: payload
      }

    case consts.SET_FOLLOW_USER:
      return {
        ...state,
        followingUser: true
      }

    case consts.SET_UNFOLLOW_USER:
      return {
        ...state,
        followingUser: false
      }

    case consts.CLEAR_FOLLOWINGS:
      return {
        ...state,
        followers: [],
        followings: []
      }

    default:
      return state
  }
}
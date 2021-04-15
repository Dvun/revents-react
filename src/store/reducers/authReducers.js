import firebase from '../../app/config/firebase'
import {APP_LOADED} from './asyncReducers'
import {dataFromSnapshot, getUserProfile} from '../../app/firestore/firestoreService'
import {listenToCurrentUserProfile} from '../actions/profileActions'

export const SIGN_IN_USER = 'SIGN_IN_USER'
export const SIGN_OUT_USER = 'SIGN_OUT_USER'


export const verifyAuth = () => (dispatch) => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(signInUser(user))
      const profileRef = getUserProfile(user.uid)
      profileRef.onSnapshot(snapshot => {
        dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)))
        dispatch({type: APP_LOADED})
      })
    } else {
      dispatch(signOutUser())
      dispatch({type: APP_LOADED})
    }
  })
}

export const signInUser = (user) => {
  return ({type: SIGN_IN_USER, payload: user})
}

export function signOutUser() {
  return ({type: SIGN_OUT_USER})
}


const initialState = {
  isAuth: false,
  user: null,
}

export const authReducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        isAuth: true,
        user: {
          email: payload.email,
          photoURL: payload.photoURL,
          uid: payload.uid,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId,
        },
      }

    case SIGN_OUT_USER:
      return {
        ...state,
        isAuth: false,
        user: null,
      }


    default:
      return state
  }
}
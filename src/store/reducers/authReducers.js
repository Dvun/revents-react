export const SIGN_IN_USER = 'SIGN_IN_USER'
export const SIGN_OUT_USER = 'SIGN_OUT_USER'


export function signInUser(payload) {
  return ({type: SIGN_IN_USER, payload})
}

export function signOutUser() {
  return ({type: SIGN_OUT_USER})
}

const initialState = {
  isAuth: true,
  user: {
    email: 'roman.test.com',
    photoURL: '/assets/user.png'
  }
}

export const authReducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        isAuth: true,
        user: {email: payload.email, photoURL: '/assets/user.png'}
      }

    case SIGN_OUT_USER:
      return {
        ...state,
        isAuth: false,
        user: null
      }


    default: return state
  }
}
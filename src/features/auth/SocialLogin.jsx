import React from 'react'
import {Button} from 'semantic-ui-react'
import {useDispatch} from 'react-redux'
import {closeModal} from '../../store/reducers/modalsReducers'
import {socialLogin} from '../../app/firestore/firebaseAuthService'

const SocialLogin = () => {
  const dispatch = useDispatch()

  function handleSocialLogin(provider) {
    dispatch(closeModal())
    return socialLogin(provider)
  }

  return (
    <>
      <Button
        onClick={() => handleSocialLogin('facebook')}
        icon="facebook"
        fluid
        color="facebook"
        style={{marginBottom: 10}}
        content="Login with Facebook"
      />
      <Button
        onClick={() => handleSocialLogin('google')}
        icon="google"
        fluid
        color="google plus"
        style={{marginBottom: 10}}
        content="Login with Google"
      />
    </>
  )
}

export default SocialLogin
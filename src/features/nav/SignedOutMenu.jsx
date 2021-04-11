import React from 'react'
import {Button, Menu} from 'semantic-ui-react'
import {useDispatch} from 'react-redux'
import {openModal} from '../../store/reducers/modalsReducers'

const SignedOutMenu = () => {
  const dispatch = useDispatch()

  return (
    <Menu.Item position='right'>
      <Button onClick={() => dispatch(openModal({modalType: 'LoginForm'}))} basic inverted content='Login'/>
      <Button basic inverted content='Register' style={{marginLeft: '.5em'}}/>
    </Menu.Item>
  )
}

export default SignedOutMenu
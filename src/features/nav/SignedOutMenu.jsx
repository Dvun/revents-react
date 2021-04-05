import React from 'react'
import {Button, Menu} from 'semantic-ui-react'

const SignedOutMenu = ({setIsAuth}) => {
  return (
    <Menu.Item position='right'>
      <Button onClick={() => setIsAuth(true)} basic inverted content='Login'/>
      <Button basic inverted content='Register' style={{marginLeft: '.5em'}}/>
    </Menu.Item>
  )
}

export default SignedOutMenu
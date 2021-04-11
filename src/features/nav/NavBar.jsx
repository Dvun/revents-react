import React from 'react'
import {Button, Container, Menu} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import SignedOutMenu from './SignedOutMenu'
import SignedInMenu from './SignedInMenu'
import {useSelector} from 'react-redux'

const NavBar = () => {
  const {isAuth} = useSelector(({authReducers}) => authReducers)

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: 15}}/>
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to="/events" name="Events"/>
        {
          isAuth &&
          <Menu.Item as={NavLink} to="/createEvent">
            <Button positive inverted content="Create Event"/>
          </Menu.Item>
        }
        {
          isAuth ?
            <SignedInMenu/>
            :
            <SignedOutMenu/>
        }
      </Container>
    </Menu>
  )
}

export default NavBar
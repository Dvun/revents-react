import React from 'react'
import {Dropdown, DropdownItem, DropdownMenu, Image, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const SignedInMenu = ({handleSignOut}) => {
  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src='/assets/user.png'/>
      <Dropdown pointing='top left' text='Roman'>
        <DropdownMenu>
          <DropdownItem as={Link} to='/createEvent' text='Create Event' icon='plus'/>
          <DropdownItem text='My Profile' icon='user'/>
          <DropdownItem onClick={handleSignOut} text='Sign out' icon='power'/>
        </DropdownMenu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu
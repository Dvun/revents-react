import React from 'react'
import {Dropdown, DropdownItem, DropdownMenu, Image, Menu} from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {signOutFirebase} from '../../app/firestore/firebaseAuthService'

const SignedInMenu = () => {
  const history = useHistory()
  const {currentUserProfile} = useSelector(({profileReducers}) => profileReducers)

  async function handleSignOut() {
    try {
      history.push('/')
      await signOutFirebase()
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUserProfile.photoURL || '/assets/user.png'}/>
      <Dropdown pointing="top left" text={currentUserProfile.displayName}>
        <DropdownMenu>
          <DropdownItem as={Link} to="/createEvent" text="Create Event" icon="plus"/>
          <DropdownItem as={Link} to={`/profile/${currentUserProfile.id}`} text="My Profile" icon="user"/>
          <DropdownItem as={Link} to="/account" text="My Account" icon="settings"/>
          <DropdownItem onClick={handleSignOut} text="Sign out" icon="power"/>
        </DropdownMenu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu
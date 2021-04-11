import React from 'react'
import {Dropdown, DropdownItem, DropdownMenu, Image, Menu} from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signOutUser} from '../../store/reducers/authReducers'

const SignedInMenu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {user} = useSelector(({authReducers}) => authReducers)

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={user.photoURL || '/assets/user.png'}/>
      <Dropdown pointing='top left' text={user.email}>
        <DropdownMenu>
          <DropdownItem as={Link} to='/createEvent' text='Create Event' icon='plus'/>
          <DropdownItem text='My Profile' icon='user'/>
          <DropdownItem onClick={() => {
            dispatch(signOutUser())
            history.push('/')
          }} text='Sign out' icon='power'
          />
        </DropdownMenu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu
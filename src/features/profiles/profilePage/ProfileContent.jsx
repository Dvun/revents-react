import React from 'react'
import {Tab, TabPane} from 'semantic-ui-react'
import AboutTab from './AboutTab'
import {PhotosTab} from './PhotosTab'

const ProfileContent = ({profile, isCurrentUser}) => {

  const panes = [
    {menuItem: 'About', render: () => <AboutTab profile={profile} isCurrentUser={isCurrentUser}/>},
    {menuItem: 'Photos', render: () => <PhotosTab profile={profile} isCurrentUser={isCurrentUser}/>},
    {menuItem: 'Events', render: () => <TabPane>Events</TabPane>},
    {menuItem: 'Followers', render: () => <TabPane>Followers</TabPane>},
    {menuItem: 'Following', render: () => <TabPane>Following</TabPane>},
  ]

  return (
    <Tab
      menu={{fluid: true, vertical: true}}
      menuPosition='right'
      panes={panes}
    />
  )
}

export default ProfileContent
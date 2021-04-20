import React from 'react'
import {Card, CardContent, CardHeader, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const ProfileCard = ({profile}) => {
  return (
    <Card as={Link} to={`/profile/${profile.id}`}>
      <Image src={profile.photoURL || '/assets/user.png'}/>
      <CardContent>
        <CardHeader content={profile.displayName}/>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
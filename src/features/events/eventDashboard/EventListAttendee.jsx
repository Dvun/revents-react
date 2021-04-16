import React from 'react'
import {Image, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const EventListAttendee = ({attendee}) => {
  return (
    <List.Item as={Link} to={`/profile/${attendee.id}`}>
      <Image src={attendee.photoURL} size={'mini'} circular/>
    </List.Item>
  )
}

export default EventListAttendee
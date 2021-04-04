import React from 'react'
import EventListItem from './EventListItem'

const EventList = ({events, handleSelectEvent, deleteEvent}) => {


  return (
    events.map(event => (
      <EventListItem key={event.id} event={event} handleSelectEvent={handleSelectEvent} deleteEvent={deleteEvent}/>
    ))
  )
}

export default EventList
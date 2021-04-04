import React, {useState} from 'react'
import {Grid} from 'semantic-ui-react'
import EventList from './EventList'
import EventForm from '../eventForm/EventForm'
import {sampleData} from '../../../app/api/sampleData'

const EventDashboard = ({formOpen, setFormOpen, handleSelectEvent, selectedEvent}) => {
  const [events, setEvents] = useState(sampleData)

  const handleCreateEvent = (event) => {
    setEvents([...events, event])
  }

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event))
    handleSelectEvent(null)
  }

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId))
  }

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} handleSelectEvent={handleSelectEvent} deleteEvent={deleteEvent}/>
        </Grid.Column>
        <Grid.Column width={6}>
          {
            formOpen &&
            <EventForm
              setFormOpen={setFormOpen}
              handleCreateEvent={handleCreateEvent}
              selectedEvent={selectedEvent}
              key={selectedEvent ? selectedEvent.id : null}
              updateEvent={handleUpdateEvent}
            />
          }
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default EventDashboard
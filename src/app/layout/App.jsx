import React, {useState} from 'react'
import './styles.css'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import NavBar from '../../features/events/nav/NavBar'
import {Container} from 'semantic-ui-react'

function App() {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setFormOpen(true)
  }

  const handleCreateFormOpen = () => {
    setSelectedEvent(null)
    setFormOpen(true)
  }

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen}/>
      <Container className='main'>
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedEvent={selectedEvent}
          handleSelectEvent={handleSelectEvent}
        />
      </Container>
    </>
  )
}

export default App

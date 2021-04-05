import React from 'react'
import {Grid} from 'semantic-ui-react'
import EventList from './EventList'
import {useSelector} from 'react-redux'

const EventDashboard = () => {
  const {events} = useSelector(({eventReducers}) => eventReducers)

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Event Filter</h2>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default EventDashboard
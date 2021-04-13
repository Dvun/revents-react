import React from 'react'
import {Grid} from 'semantic-ui-react'
import EventList from './EventList'
import {useSelector} from 'react-redux'
import EventListItemPlaceholder from './EventListItemPlaceholder'
import EventFilters from '../eventDetailed/EventFilters'

const EventDashboard = () => {
  const {events} = useSelector(({eventReducers}) => eventReducers)
  const {loading} = useSelector(({asyncReducers}) => asyncReducers)


  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          {
            loading &&
            <>
              <EventListItemPlaceholder/>
            </>
          }
          <EventList events={events}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventFilters/>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default EventDashboard
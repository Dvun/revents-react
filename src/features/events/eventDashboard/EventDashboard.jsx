import React, {useState} from 'react'
import {Grid} from 'semantic-ui-react'
import EventList from './EventList'
import {useDispatch, useSelector} from 'react-redux'
import EventListItemPlaceholder from './EventListItemPlaceholder'
import EventFilters from '../eventDetailed/EventFilters'
import {listenToEventsFromFirestore,} from '../../../app/firestore/firestoreService'
import {listenToEvents} from '../../../store/actions/eventActions'
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'

const EventDashboard = () => {
  const dispatch = useDispatch()
  const {events} = useSelector(({eventReducers}) => eventReducers)
  const {loading} = useSelector(({asyncReducers}) => asyncReducers)
  const [predicate, setPredicate] = useState(new Map([
    ['startDate', new Date()],
    ['filter', 'All']
  ]))

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)))
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  })

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
          <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading}/>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default EventDashboard
import React from 'react'
import {Grid} from 'semantic-ui-react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSidebar from './EventDetailedSidebar'
import {useDispatch, useSelector} from 'react-redux'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import {listenToEventFromFirestore} from '../../../app/firestore/firestoreService'
import {listenToEvents} from '../../../store/actions/eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import {Redirect} from 'react-router'

const EventDetailedPage = ({match}) => {
  const dispatch = useDispatch()
  const {user} = useSelector(({authReducers}) => authReducers)
  const event = useSelector(({eventReducers}) => eventReducers.events.find(e => e.id === match.params.id))
  const {loading, error} = useSelector(({asyncReducers}) => asyncReducers)
  const isHost = event?.hostUid === user.uid
  const isGoing = event?.attendees?.some(a => a.id === user.uid)

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvents([event])),
    deps: [match.params.id]
  })

  if (loading || (!event && !error)) return <LoadingComponent content='Loading event...'/>
  if (error) return <Redirect to='/error'/>

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost}/>
          <EventDetailedInfo event={event}/>
          <EventDetailedChat eventId={event.id}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={event?.attendees} hostUid={event.hostUid}/>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default EventDetailedPage
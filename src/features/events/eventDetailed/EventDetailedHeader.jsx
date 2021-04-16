import React, {useState} from 'react'
import {Button, Header, Image, Item, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'
import {toast} from 'react-toastify'
import {addUserAttendance, cancelUserAttendance} from '../../../app/firestore/firestoreService'

const EventDetailedHeader = ({event, isGoing, isHost}) => {
  const [loading, setLoading] = useState(false)
  
  async function handleUserJoinEvent() {
    setLoading(true)
    try {
      await addUserAttendance(event)
    } catch (e) {
      toast.error(e.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  async function handleUserRemoveFromEvent() {
    setLoading(true)
    try {
      await cancelUserAttendance(event)
    } catch (e) {
      toast.error(e.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{padding: '0'}}>
        <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid className="eventImageStyle"/>

        <Segment basic className="eventImageTextStyle">
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{color: 'white'}}
                />
                <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                <p>
                  Hosted by <strong><Link to={`/profile${event.hostUid}`}>{event.hostedBy}</Link></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {
          !isHost &&
          <>
            {
              isGoing ?
                <Button onClick={handleUserRemoveFromEvent} loading={loading}>Cancel My Place</Button>
                :
                <Button
                  onClick={handleUserJoinEvent}
                  loading={loading}
                  color="teal"
                >JOIN THIS EVENT
                </Button>
            }
          </>
        }

        {
          isHost &&
          <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
            Manage Event
          </Button>
        }
      </Segment>
    </Segment.Group>
  )
}

export default EventDetailedHeader
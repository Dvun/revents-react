/*global google*/
import React, {useState} from 'react'
import {Button, Confirm, Header, Segment} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import {listenToEvents} from '../../../store/actions/eventActions'
import FormLayout from './FormLayout'
import {Formik, Form} from 'formik'
import {schema} from '../../../validation/FormValidation'
import MySelectInput from './MySelectInput'
import {categoryData} from '../../../app/api/categoryOptions'
import MyDateInput from './MyDateInput'
import MyPlaceInput from './MyPlaceInput'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import {
  addEventToFirestore, cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from '../../../app/firestore/firestoreService'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import {Redirect} from 'react-router'
import {toast} from 'react-toastify'


const EventForm = ({match, history}) => {
  const dispatch = useDispatch()
  const [loadingCancel, setLoadingCancel] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const selectedEvent = useSelector(({eventReducers}) => eventReducers.events.find(e => e.id === match.params.id))
  const {loading, error} = useSelector(({asyncReducers}) => asyncReducers)
  const initialValue = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null,
    },
    venue: {
      address: '',
      latLng: null,
    },
    date: '',
  }

  const handleCancelToggle = async (event) => {
    setConfirmOpen(false)
    setLoadingCancel(true)
    try {
      await cancelEventToggle(event)
      setLoadingCancel(false)
    } catch (e) {
      setLoadingCancel(true)
      toast.error(e.message)
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvents([event])),
    deps: [match.params.id],
  })

  if (loading) return <LoadingComponent content="Loading event..."/>
  if (error) return <Redirect to="/error"/>

  const handleSubmit = async (values, setSubmitting) => {
    try {
      selectedEvent ?
        await updateEventInFirestore(values)
        :
        await addEventToFirestore(values)
      setSubmitting(false)
      history.push('/events')
    } catch (error) {
      toast.error(error.message)
      setSubmitting(false)
    }
  }

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
      >
        {({isSubmitting, dirty, isValid, values}) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details"/>
            <FormLayout placeholder="Event title" name="title"/>
            <MySelectInput name="category" options={categoryData} placeholder="Category"/>
            <FormLayout placeholder="Description" name="description"/>
            <Header sub color="teal" content="Event Location Details"/>
            <MyPlaceInput placeholder="City" name="city"/>
            <MyPlaceInput
              placeholder="Venue"
              name="venue"
              disabled={!values.city.latLng}
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 100,
                types: ['establishment'],
              }}
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            {selectedEvent &&
            <Button
              loading={loadingCancel}
              type="button"
              floated={'left'}
              content={selectedEvent.isCancelled ? 'Reactivate event' : 'Cancel Event'}
              color={selectedEvent.isCancelled ? 'green' : 'red'}
              onClick={() => setConfirmOpen(true)}
            />}

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated={'right'}
              positive
              content={'Submit'}
            />

            <Button
              disabled={isSubmitting}
              type="button"
              floated={'right'}
              content={'Cancel'}
              onClick={() => history.push('/events')}
            />

          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled ?
            'This will reactivate the event - are you sure?'
            :
            'This will cancel the event - are you sure?'
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  )
}

export default EventForm
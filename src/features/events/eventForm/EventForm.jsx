/*global google*/
import React from 'react'
import {Button, Header, Segment} from 'semantic-ui-react'
import cuid from 'cuid'
import {useDispatch, useSelector} from 'react-redux'
import {createEvent, updateEvent} from '../../../store/actions/eventActions'
import FormLayout from './FormLayout'
import {Formik, Form} from 'formik'
import {schema} from '../../../validation/FormValidation'
import MySelectInput from './MySelectInput'
import {categoryData} from '../../../app/api/categoryOptions'
import MyDateInput from './MyDateInput'
import MyPlaceInput from './MyPlaceInput'


const EventForm = ({match, history}) => {
  const dispatch = useDispatch()
  const selectedEvent = useSelector(({eventReducers}) => eventReducers.events.find(e => e.id === match.params.id))
  const initialValue = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null
    },
    venue: {
      address: '',
      latLng: null
    },
    date: '',
  }

  const handleSubmit = (values) => {
    selectedEvent ?
      dispatch(updateEvent({...selectedEvent, ...values}))
      :
      dispatch(createEvent({
        ...values,
        id: cuid(),
        hostedBy: 'Roman',
        attendees: [],
        hostPhotoURL: '/assets/user.png',
      }))
    history.push('/events')
  }

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={values => handleSubmit(values)}
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
                types: ['establishment']
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
    </Segment>
  )
}

export default EventForm
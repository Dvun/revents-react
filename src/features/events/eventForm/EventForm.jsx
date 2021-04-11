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


const EventForm = ({match, history}) => {
  const dispatch = useDispatch()
  const selectedEvent = useSelector(({eventReducers}) => eventReducers.events.find(e => e.id === match.params.id))
  const initialValue = selectedEvent ?? {
      title: '',
      category: '',
      description: '',
      city: '',
      venue: '',
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
        <Form className="ui form">
          <Header sub color="teal" content="Event Details"/>
          <FormLayout placeholder="Event title" name='title'/>
          <MySelectInput name='category' options={categoryData} placeholder="Category"/>
          <FormLayout placeholder="Description" name='description'/>
          <Header sub color="teal" content="Event Location Details"/>
          <FormLayout placeholder="City" name='city'/>
          <FormLayout placeholder="Venue" name='venue'/>
          <FormLayout placeholder="Date" name='date' type='date'/>
          <Button type="submit" floated={'right'} positive content={'Submit'}/>
          <Button type="button" floated={'right'} content={'Cancel'}/>
        </Form>
      </Formik>
    </Segment>
  )
}

export default EventForm
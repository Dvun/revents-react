import React, {useState} from 'react'
import {Button, Form, Header, Segment} from 'semantic-ui-react'
import FormLayout from '../nav/FormLayout'
import cuid from 'cuid'

const EventForm = ({setFormOpen, handleCreateEvent, selectedEvent, updateEvent}) => {
  const [values, setValues] = useState(selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  })

  const formFields = [
    {id: 1, name: 'title', placeholder: 'Event Title', type: 'text', value: values.title},
    {id: 2, name: 'category', placeholder: 'Category', type: 'text', value: values.category},
    {id: 3, name: 'description', placeholder: 'Description', type: 'text', value: values.description},
    {id: 4, name: 'city', placeholder: 'City', type: 'text', value: values.city},
    {id: 5, name: 'venue', placeholder: 'Venue', type: 'text', value: values.venue},
    {id: 6, name: 'date', placeholder: 'Date', type: 'date', value: values.date},
  ]

  const handleFormSubmit = () => {
    selectedEvent ?
      updateEvent({...selectedEvent, ...values})
      :
      handleCreateEvent({
        ...values,
        id: cuid(),
        hostedBy: 'Roman',
        attendees: [],
        hostPhotoURL: '/assets/user.png',
      })
    setFormOpen(false)
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Editing the event' : 'Create new event'}/>
      <Form onSubmit={handleFormSubmit}>
        {formFields.map(formField => (
          <FormLayout
            key={formField.id}
            type={formField.type}
            placeholder={formField.placeholder}
            value={formField.value}
            name={formField.name}
            onChange={(e) => handleInputChange(e)}
          />
        ))}
        <Button type={'submit'} floated={'right'} positive content={'Submit'}/>
        <Button type={'submit'} floated={'right'} content={'Cancel'} onClick={() => setFormOpen(false)}/>
      </Form>
    </Segment>
  )
}

export default EventForm
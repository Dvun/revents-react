import React from 'react'
import {Formik, Form, Field} from 'formik'
import {addEventChatComment} from '../../../app/firestore/firebaseService'
import {toast} from 'react-toastify'
import {Loader} from 'semantic-ui-react'
import {chatSchema} from '../../../validation/FormValidation'

const EventDetailedChatForm = ({eventId, closeForm, parentId}) => {


  async function handleSendToChat(values, setSubmitting, resetForm) {
    try {
      await addEventChatComment(eventId, {...values, parentId})
      resetForm()
    } catch (e) {
      toast.error(e.message)
    } finally {
      setSubmitting(false)
      closeForm({open: false, commentId: null})
    }
  }

  return (
    <Formik
      initialValues={{comment: ''}}
      validationSchema={chatSchema}
      onSubmit={async (values, {setSubmitting, resetForm}) => handleSendToChat(values, setSubmitting, resetForm)}
    >
      {({isSubmitting, handleSubmit, isValid}) => (
        <Form className="ui form">
          <Field name="comment">
            {({field}) => (
              <div style={{position: 'relative'}}>
                <Loader active={isSubmitting}/>
                <textarea
                  rows="2"
                  {...field}
                  placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.shiftKey) {
                      return
                    }
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      isValid && handleSubmit()
                    }
                  }}
                />
              </div>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  )
}

export default EventDetailedChatForm
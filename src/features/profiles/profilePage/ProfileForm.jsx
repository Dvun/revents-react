import React from 'react'
import {Formik, Form} from 'formik'
import FormLayout from '../../events/eventForm/FormLayout'
import {Button} from 'semantic-ui-react'
import {userUpdateSchema} from '../../../validation/FormValidation'
import TextAreaLayout from '../../events/eventForm/TextAreaLayout'
import {toast} from 'react-toastify'
import {updateUserProfile} from '../../../app/firestore/firestoreService'

const ProfileForm = ({profile}) => {


  const handleUpdateUserProfile = async (values, setSubmitting) => {
    try {
      await updateUserProfile(values)
    } catch (e) {
      toast.error(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || '',
      }}
      validationSchema={userUpdateSchema}
      onSubmit={(values, {setSubmitting}) => handleUpdateUserProfile(values, setSubmitting)}
    >
      {({isSubmitting, isValid, dirty}) => (
        <Form className="ui form">
          <FormLayout name="displayName" placeholder="Display name"/>
          <TextAreaLayout name="description" placeholder="Profile description" rows={10}/>
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            type="submit"
            size="large"
            positive
            content="Update profile"
            floated={'right'}
          />
        </Form>
      )}
    </Formik>
  )
}

export default ProfileForm
import React from 'react'
import {Button, Header, Label, Segment} from 'semantic-ui-react'
import {Formik, Form} from 'formik'
import {passwordSchema} from '../../validation/FormValidation'
import FormLayout from '../events/eventForm/FormLayout'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {updateUserPassword} from '../../app/firestore/firestoreService'

const AccountPage = () => {
  const {user} = useSelector(({authReducers}) => authReducers)

  const handleUpdatePassword = async (values, setSubmitting, setErrors) => {
    try {
      await updateUserPassword(values)
      setSubmitting(false)
    } catch (e) {
      setErrors({auth: e.message})
      setSubmitting(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Segment>
      <Header dividing size="large" content="Account"/>
      {
        user.providerId === 'password' &&
        <>
          <Header color="teal" sub content="Change Password"/>
          <p>Use this form to change your password</p>
          <Formik
            initialValues={{newPassword1: '', newPassword2: ''}}
            validationSchema={passwordSchema}
            onSubmit={(values, {setSubmitting, setErrors}) => handleUpdatePassword(values, setSubmitting, setErrors)}
          >
            {({errors, isSubmitting, isValid, dirty}) => (
              <Form className="ui form">
                <FormLayout name="newPassword1" type="password" plaveholder="New Password"/>
                <FormLayout name="newPassword2" type="password" plaveholder="Repeat Password"/>
                {errors.auth && <Label basic color="red" style={{marginBottom: 10}} content={errors.auth}/>}
                <Button
                  style={{display: 'block'}}
                  disabled={!isValid || isSubmitting || !dirty}
                  loading={isSubmitting}
                  size="large"
                  positive
                  type="submit"
                  content="Update password"
                />
              </Form>
            )}
          </Formik>
        </>
      }
      {
        user.providerId === 'facebook.com' &&

        <>
          <Header color="teal" sub content="Facebook account"/>
          <p>Please visit Facebook to update your account</p>
          <Button icon="facebook" color="facebook" as={Link} to="https://facebook.com" content="Go to Facebook"/>
        </>
      }
      {
        user.providerId === 'google.com' &&
        <>
          <Header color="teal" sub content="Google account"/>
          <p>Please visit Google to update your account</p>
          <Button icon="google" color="google plus" as={Link} to="https://google.com" content="Go to Google"/>
        </>
      }
    </Segment>
  )
}

export default AccountPage
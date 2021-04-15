import React from 'react'
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import {Form, Formik} from 'formik'
import {registerSchema} from '../../validation/FormValidation'
import FormLayout from '../events/eventForm/FormLayout'
import {Button, Divider, Label} from 'semantic-ui-react'
import {useDispatch} from 'react-redux'
import {closeModal} from '../../store/reducers/modalsReducers'
import {registerInFirebase} from '../../app/firestore/firebaseService'
import SocialLogin from './SocialLogin'

export const RegisterForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (values, setSubmitting, setErrors) => {
    try {
      await registerInFirebase(values)
      setSubmitting(false)
      dispatch(closeModal())
    } catch (err) {
      setErrors({auth: err.message})
      setSubmitting(false)
    }
  }

  return (
    <ModalWrapper size="mini" header="Register in to Re-vents">
      <Formik
        initialValues={{displayName: '', email: '', password: ''}}
        validationSchema={registerSchema}
        onSubmit={(values, {setSubmitting, setErrors}) => handleLogin(values, setSubmitting, setErrors)}
      >
        {({isSubmitting, isValid, dirty, errors}) => (
          <Form className='ui form'>
            <FormLayout name='displayName' placeholder='Display Name'/>
            <FormLayout name='email' placeholder='Email Address'/>
            <FormLayout name='password' placeholder='Password' type='password'/>
            {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth}/>}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Register'
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin/>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

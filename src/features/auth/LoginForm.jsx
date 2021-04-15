import React from 'react'
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import {Form, Formik} from 'formik'
import {loginSchema} from '../../validation/FormValidation'
import FormLayout from '../events/eventForm/FormLayout'
import {Button, Divider, Label} from 'semantic-ui-react'
import {useDispatch} from 'react-redux'
import {closeModal} from '../../store/reducers/modalsReducers'
import {sigInWithEmail} from '../../app/firestore/firebaseService'
import SocialLogin from './SocialLogin'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (values, setSubmitting, setErrors) => {
    try {
      await sigInWithEmail(values)
      setSubmitting(false)
      dispatch(closeModal())
    } catch (err) {
      setErrors({auth: err.message})
      setSubmitting(false)
    }
  }

  return (
    <ModalWrapper size="mini" header="Sign in to Re-vents">
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginSchema}
        onSubmit={(values, {setSubmitting, setErrors}) => handleLogin(values, setSubmitting, setErrors)}
      >
        {({isSubmitting, isValid, dirty, errors}) => (
          <Form className='ui form'>
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
            content='Login'
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin/>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

export default LoginForm
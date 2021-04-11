import React from 'react'
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import {Form, Formik} from 'formik'
import {loginSchema} from '../../validation/FormValidation'
import FormLayout from '../events/eventForm/FormLayout'
import {Button} from 'semantic-ui-react'
import {useDispatch} from 'react-redux'
import {signInUser} from '../../store/reducers/authReducers'
import {closeModal} from '../../store/reducers/modalsReducers'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (values, setSubmitting) => {
    dispatch(signInUser(values))
    setSubmitting(false)
    dispatch(closeModal())
  }

  return (
    <ModalWrapper size="mini" header="Sign in to Re-vents">
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginSchema}
        onSubmit={(values, {setSubmitting}) => handleLogin(values, setSubmitting)}
      >
        {({isSubmitting, isValid, dirty}) => (
          <Form className='ui form'>
            <FormLayout name='email' placeholder='Email Address'/>
            <FormLayout name='password' placeholder='Password' type='password'/>
            <Button
            loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
            type='submit'
            fluid
            size='large'
            color='teal'
            content='Login'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

export default LoginForm
import React from 'react'
import {Form} from 'semantic-ui-react'

const FormLayout = ({type, placeholder, value, onChange, name}) => {


  return (
    <Form.Field>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}/>
    </Form.Field>
  )
}

export default FormLayout
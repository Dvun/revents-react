import React from 'react'
import {FormField} from 'semantic-ui-react'
import {useField, ErrorMessage} from 'formik'

const FormLayout = ({...props}) => {
  const [field, meta] = useField(props)

  return (
    <FormField error={!!meta.error}>
      <input {...field} {...props} />
      <ErrorMessage name={field.name} render={() => <div style={{color: 'red'}}>{meta.error}</div>}/>
    </FormField>
  )
}

export default FormLayout
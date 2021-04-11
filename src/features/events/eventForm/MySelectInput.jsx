import React from 'react'
import {FormField, Select} from 'semantic-ui-react'
import {ErrorMessage, useField} from 'formik'

const MySelectInput = ({...props}) => {
  const [field, meta, helpers] = useField(props)

  return (
    <FormField error={!!props.errors}>
      <Select
        clearable
        values={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}/>
      <ErrorMessage name={field.name} render={() => <div style={{color: 'red'}}>{meta.error}</div>}/>
    </FormField>
  )
}

export default MySelectInput
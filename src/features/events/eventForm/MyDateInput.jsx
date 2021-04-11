import React from 'react'
import {ErrorMessage, useField, useFormikContext} from 'formik'
import {FormField} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const MyDateInput = ({...props}) => {
  const {setFieldValue} = useFormikContext()
  const [field, meta] = useField(props)

  return (
    <div>
      <FormField error={!!meta.error}>
        <DatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={value => setFieldValue(field.name, value)}
        />
        <ErrorMessage name={field.name} render={() => <div style={{color: 'red'}}>Date is required!</div>}/>
      </FormField>
    </div>
  )
}

export default MyDateInput
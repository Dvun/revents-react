import React from 'react'
import {FormField, List, ListDescription, ListHeader, ListItem, Segment} from 'semantic-ui-react'
import {useField, ErrorMessage} from 'formik'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

const MyPlaceInput = ({options, ...props}) => {
  const [field, meta, helpers] = useField(props)

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((result) => getLatLng(result[0]))
      .then((latLng) => helpers.setValue({address, latLng}))
      .catch((error) => helpers.setError(error))
  }

  const handleBlur = (e) => {
    field.onBlur(e)
    if (!field.value.latLng) {
      helpers.setValue({address: '', latLng: null})
    }
  }

  return (
    <PlacesAutocomplete
      value={field.value['address']}
      onChange={value => helpers.setValue({address: value})}
      onSelect={value => handleSelect(value)}
      searchOptions={options}
    >
      {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
        <FormField error={!!meta.error}>
          <input {...getInputProps({name: field.name, onBlur: (e) => handleBlur(e), ...props})}/>
          <ErrorMessage name={field.name} render={() => <div style={{color: 'red'}}>{meta.error['address']}</div>}/>
          {suggestions?.length > 0 && (
            <Segment loading={loading} style={{marginTop: 0, position: 'absolute', zIndex: 1000, width: '100%'}}>
              <List selection>
                {suggestions.map((suggestion, index) => (
                  <ListItem {...getSuggestionItemProps(suggestion)} key={index}>
                    <ListHeader>
                      {suggestion.formattedSuggestion.mainText}
                    </ListHeader>
                    <ListDescription>
                      {suggestion.formattedSuggestion.secondaryText}
                    </ListDescription>
                  </ListItem>
                ))}
              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  )
}

export default MyPlaceInput
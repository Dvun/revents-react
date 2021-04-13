import React from 'react'
import {Header, Menu, MenuItem} from 'semantic-ui-react'
import Calendar from 'react-calendar'

const EventFilters = () => {
  return (
    <>
      <Menu vertical size='large' style={{width: '100%'}}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <MenuItem content='All Events'/>
        <MenuItem content="I'm going"/>
        <MenuItem content="I'm hosting"/>
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select date'/>
      <Calendar />
    </>
  )
}

export default EventFilters
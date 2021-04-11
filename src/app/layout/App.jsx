import React from 'react'
import './styles.css'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar'
import {Container} from 'semantic-ui-react'
import HomePage from '../../features/home/HomePage'
import {Route, Switch} from 'react-router-dom'
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage'
import EventForm from '../../features/events/eventForm/EventForm'
import {useLocation} from 'react-router'
import ModalManager from '../common/modals/ModalManager'

export default function App() {
  const {key} = useLocation()

  return (
    <>
      <ModalManager />
      <Route exact path='/' component={HomePage}/>
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar/>
          <Container className='main'>
            <Switch>
              <Route exact path='/events' component={EventDashboard}/>
              <Route path='/events/:id' component={EventDetailedPage}/>
              <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key}/>
            </Switch>
          </Container>
        </>
      )}/>
    </>
  )
}
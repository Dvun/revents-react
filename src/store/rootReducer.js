import {combineReducers} from 'redux'
import {eventReducers} from './reducers/eventReducers'
import {modalsReducers} from './reducers/modalsReducers'
import {authReducers} from './reducers/authReducers'


export const rootReducer = combineReducers({
  eventReducers,
  modalsReducers,
  authReducers
})
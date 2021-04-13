import {combineReducers} from 'redux'
import {eventReducers} from './reducers/eventReducers'
import {modalsReducers} from './reducers/modalsReducers'
import {authReducers} from './reducers/authReducers'
import {asyncReducers} from './reducers/asyncReducers'


export const rootReducer = combineReducers({
  eventReducers,
  modalsReducers,
  authReducers,
  asyncReducers
})
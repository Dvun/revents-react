import * as consts from '../constants/eventConstats'
import {FETCH_EVENTS} from '../constants/eventConstats'

const initialState = {
  events: [],
  comments: []
}

export const eventReducers = (state = initialState, {type, payload}) => {
  switch (type) {

    case FETCH_EVENTS:
      return {
        ...state,
        events: payload
      }

    case consts.CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      }

    case consts.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== payload),
      }

    case consts.UPDATE_EVENT:
      return {
        ...state,
        events: [...state.events.filter(event => event.id !== payload.id), payload],
      }

    case consts.LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload
      }

    case consts.CLEAR_COMMENTS:
      return {
        ...state,
        comments: []
      }

    default:
      return state
  }
}
import * as consts from '../constants/eventConstats'
import {sampleData} from '../../app/api/sampleData'

const initialState = {
  events: sampleData,
}

export const eventReducers = (state = initialState, {type, payload}) => {
  switch (type) {

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

    default:
      return state
  }
}
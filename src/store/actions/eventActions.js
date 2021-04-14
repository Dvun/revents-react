import * as consts from '../constants/eventConstats'
import {asyncActionError, asyncActionFinnish, asyncActionStart} from '../reducers/asyncReducers'
import {fetchSampleData} from '../../app/api/mockApi'
import {FETCH_EVENTS} from '../constants/eventConstats'

export const loadEvents = () => async (dispatch) => {
  dispatch(asyncActionStart())
  try {
    const events = await fetchSampleData()
    dispatch({type: FETCH_EVENTS, payload: events})
    dispatch(asyncActionFinnish())
  } catch (err) {
    dispatch(asyncActionError(err))
  }
}

export const listenToEvents = (events) => (dispatch) => {
  dispatch({type: FETCH_EVENTS, payload: events})
}

export const createEvent = (event) => (dispatch) => {
  dispatch({type: consts.CREATE_EVENT, payload: event})
}

export const updateEvent = (updatedEvent) => (dispatch) => {
  dispatch({type: consts.UPDATE_EVENT, payload: updatedEvent})
}

export const deleteEvent = (eventId) => (dispatch) => {
  dispatch({type: consts.DELETE_EVENT, payload: eventId})
}

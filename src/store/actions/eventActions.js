import * as consts from '../constants/eventConstats'


export const createEvent = (event) => (dispatch) => {
  dispatch({type: consts.CREATE_EVENT, payload: event})
}

export const updateEvent = (updatedEvent) => (dispatch) => {
  dispatch({type: consts.UPDATE_EVENT, payload: updatedEvent})
}

export const deleteEvent = (eventId) => (dispatch) => {
  dispatch({type: consts.DELETE_EVENT, payload: eventId})
}

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export function openModal(payload) {
  return ({type: OPEN_MODAL, payload})
}

export function closeModal() {
  return ({type: CLOSE_MODAL})
}

const initialState = null

export const modalsReducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case OPEN_MODAL:
      console.log(payload)
      const {modalType, modalProps} = payload
      return {modalType, modalProps}

    case CLOSE_MODAL:
      return null

    default:
      return state
  }
}
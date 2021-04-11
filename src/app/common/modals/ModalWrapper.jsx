import React from 'react'
import {useDispatch} from 'react-redux'
import {Modal, ModalContent, ModalHeader} from 'semantic-ui-react'
import {closeModal} from '../../../store/reducers/modalsReducers'

const ModalWrapper = ({children, size, header}) => {
  const dispatch = useDispatch()

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
      {header && <ModalHeader>{header}</ModalHeader>}
      <ModalContent>
        {children}
      </ModalContent>
    </Modal>
  )
}

export default ModalWrapper
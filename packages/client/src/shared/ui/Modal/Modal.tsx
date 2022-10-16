import React from "react"

import "./Modal.scss";

interface ModalProps {
  onClose: () => void;
  isOpened: boolean;
}

export const Modal : React.FC<ModalProps> = ({isOpened, onClose, children}) => {
  if (!isOpened) {
    return (null)
  }

  return (
    <div className="modal">
      <div className="modal_container">
        <div>{children}</div>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  )
}

export default Modal

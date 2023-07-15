import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import React from 'react'

 const ToastMsg = ({show,setShow}) => {
    
  return (
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto text-danger">Danger</strong>
          </Toast.Header>
          <Toast.Body className='fw-bold '>Login To Access</Toast.Body>
        </Toast>
      </ToastContainer>

  )
}

export default ToastMsg
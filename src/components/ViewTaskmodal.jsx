import React from 'react'
import { Modal } from 'react-bootstrap';

function ViewTaskmodal({ isOpen, onClose ,taskInfo}) {
  return (
    <>
       <Modal show={isOpen} onHide={onClose}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered>
      <Modal.Header closeButton>
        <div className='d-flex justify-content-center'>
        
        </div>
        
      </Modal.Header>
      {taskInfo?<Modal.Body className='text-center '>
      <Modal.Title className="text-center">{taskInfo.title}</Modal.Title>
       <p>{taskInfo.description}</p>
       <p >Status: <span style={{ color: taskInfo.status === true ? "green" : "red" }}>{taskInfo.status===true?"Completed":"Pending"}</span></p>
       <p>Created at:{taskInfo.created_at}</p>
       <p>Updated at:{taskInfo.updated_at}</p>

      </Modal.Body>:""}
    </Modal>
    </>
  )
}

export default ViewTaskmodal

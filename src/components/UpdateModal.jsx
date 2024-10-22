import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

function UpdateModal({isOpen, onClose,handleUpdate,taskInfo}) {
    const [updatedTask, setUpdatedTask] = useState({ 
        title: '',
        description: '',
        status: false,
        updated_at: new Date().toISOString()
        });
        useEffect(() => {
            if (taskInfo) {
                setUpdatedTask({
                    title: taskInfo.title,
                    description: taskInfo.description,
                    status: taskInfo.status
                });
            }
        }, [taskInfo]);
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setUpdatedTask({
                ...updatedTask,
                [name]: value
            });
        };

        const handleSubmit = () => {
            handleUpdate(updatedTask);
            onClose();
          };
          
      
  return (
    <>
   <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={updatedTask.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={updatedTask.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <p className='text-center'>status: <span style={{ color: updatedTask.status === true ? "green" : "red" }}>{updatedTask.status===false?'Pending':'Completed'}</span> </p>

                    {updatedTask.status===false?<div className='d-flex justify-content-center mt-2'>
            <Button onClick={()=>setUpdatedTask({...updatedTask,status:true})} variant="success"  >
           Complete Task
          </Button>
            </div>:<div className='d-flex justify-content-center mt-2'>
            <Button  variant="danger" onClick={()=>setUpdatedTask({...updatedTask,status:false})}  >
           Pending Task
          </Button>
            </div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default UpdateModal

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddModal({ isOpen, onClose,  handleAddnewTask }) {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const handleSubmit = () => {
    handleAddnewTask(newTask);
    onClose()
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Enter task title"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Enter task description"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;

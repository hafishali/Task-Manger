import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ViewTaskmodal from './ViewTaskmodal';
import { deleteTask, updateTask, viewTask } from '../services/api';
import UpdateModal from './UpdateModal';
import swal from 'sweetalert';
import empty_logo from '../assets/nothing.jpg'

function TaskCards({  tasksItems,getAlltasks,filteredTask }) {
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [taskInfo,setTaskInfo]=useState()
    const [taskId,setTaskid]=useState()

    // view task details
    const handleView = async (id) => {
        try {
            const accessToken = sessionStorage.getItem('access')
            console.log(accessToken)
            const reqHeader = {
                "Authorization": `Bearer ${accessToken}`
            }
            const response = await viewTask(id,reqHeader)
            console.log(response.data)
            if (response.status === 200) {
                setTaskInfo(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        setIsViewOpen(true)
    }
    console.log(taskInfo)
    const updateTaskId=(task)=>{
        setIsUpdateOpen(true)  
        setTaskInfo(task)
       
    }
// update task details
    const handleUpdate=async(reqBody)=>{
        try { 
            const response=await updateTask(taskInfo.id,reqBody)
            console.log(response.data)
            if(response.status===200){
                swal({
                    title: 'Successful',
                    text: 'Your task has been updated successfully',
                    icon: 'success',
                });
                getAlltasks()

            } 
          } catch (error) {
            console.log(error)
            swal({
                title: 'error',
                text: 'Something went wrong',
                icon: 'error',
            });
          }
        }

        // delete task details
        const handleDelete=async(id)=>{
            console.log(id)
            try {
                const response=await deleteTask(id)
                console.log(response.data)
                if(response.status===204){
                    swal({
                        title: 'Successful',
                        text: 'Your task has been deleted successfully',
                        icon: 'success',
                    });
                    getAlltasks()
    
                } 
                
            } catch (error) {
                console.log(error)
                swal({
                title: 'error',
                text: 'Something went wrong',
                icon: 'error',
                });
            }
        }
        const tasksToDisplay = filteredTask?.length > 0 ? filteredTask : tasksItems;
    return (
        <>
        {tasksToDisplay?.length > 0
        ? tasksToDisplay.map((items, index) => (
            <Card
              key={index}
              style={{ width: '100%', backgroundColor: '#C8C3C3' }}
              className="rounded mt-3 mb-3"
            >
              <Card.Body>
                <Card.Title className="text-center">{items.title}</Card.Title>
                <Card.Text className="text-center">{items.description}</Card.Text>
                <div className="d-flex justify-content-center">
                  <Button className="bg-success" onClick={() => handleView(items.id)}>
                    View
                  </Button>
                  <Button className="bg-primary ms-2" onClick={() => updateTaskId(items)}>
                    Update
                  </Button>
                  <Button className="bg-danger ms-2" onClick={() => handleDelete(items.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        :<div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '20rem' }}>
        <img 
            className="img-fluid" 
            src={empty_logo} 
            alt="empty_logo" 
            style={{ objectFit: 'contain', maxHeight: '100%' }} 
        />
       <h5 className='text-danger'> Yet no tasks for you</h5>
    </div>
    }
            
            <ViewTaskmodal
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                taskInfo={taskInfo}
            />
              <UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        handleUpdate={handleUpdate}
        taskInfo={taskInfo}
        
      />

        </>
    )
}

export default TaskCards

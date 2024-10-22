import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AddModal from '../components/AddModal';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import TaskCards from '../components/TaskCards';
import { addNewtask, filterTask, getTask, logoutUser } from '../services/api';
import swal from 'sweetalert';




function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tasks, setTasks] = useState({});
  const [filteredTask,setFilteredTask]=useState()
  const [isFiltering, setIsFiltering] = useState(false);
  
  
 
  console.log(tasks)
// getting tasks 
  const getAlltasks=async()=>{
    try {
     
      const response=await getTask()
      console.log(response.data)
      if(response.status===200){
       setTasks(response.data)
      } 
    } catch (error) {
      console.log(error)
    }
  }
// adding new tasks
  const handleAddnewTask=async(newTask)=>{
    try {
      
      const response=await addNewtask(newTask)
      console.log(response.data)
      if(response.status===201){
        swal({
          title: 'Successful',
          text: 'Your task added successfully',
          icon: 'success',
      });
      getAlltasks()
      } 
    } catch (error) {
      console.log(error)
    }
  }

  // filter tasks
  const handleFilter = async (status) => {
    try {
      const response = await filterTask(status);
      console.log(response.data);
      if (response.status === 200) {
        setIsFiltering(true); 
        if (response.data.length === 0) {
          setFilteredTask([]); 
        } else {
          setFilteredTask(response.data);
        }
      }
    } catch (error) {
      console.log(error);
      setIsFiltering(false); 
    }
  };
  const clearFilter = () => {
    setFilteredTask([]); 
    setIsFiltering(false); 
  };
  // logout
  const handleLogout=async()=>{
    console.log('sadfas')
    try {
      const reqBody={refresh:sessionStorage.getItem('refresh')}
      const response=await logoutUser(reqBody)
      console.log(response.status)
      if(response.status===205){
        sessionStorage.clear()
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    getAlltasks()
  },[])

console.log(filteredTask)

  return (
    <>
      <Header handleLogout={handleLogout} />
      
      <div>
        <div className='d-flex justify-content-center mt-5'>
          <Button onClick={() => setIsModalOpen(true)}> Add new task</Button>
        </div>
        <hr />
        <div>
          <h2 className='text-center'>Your <span className='text-primary'>Tasks</span></h2>
          <div className='d-flex justify-content-end'>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="primary" className="me-2">
                Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { handleFilter('completed') }}   >Completed Task</Dropdown.Item>
                <Dropdown.Item  onClick={() => { handleFilter('pending') }}>Pending Task</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div> 
          <div className='mt-5'>
          {isFiltering && (
              <div className='mt-3 d-flex justify-content-end me-2'>
                <Button onClick={clearFilter}> Clear Filter</Button>
              </div>
            )}
            {isFiltering && filteredTask.length === 0 ? (
              <div className="text-center">
                <h5 className='text-danger'>No tasks found for this filter.</h5>
              </div>
            ) : (
              <TaskCards tasksItems={isFiltering ? filteredTask : tasks} getAlltasks={getAlltasks} />
            )}
          </div>
        </div>
      </div>
     
      <AddModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  handleAddnewTask={handleAddnewTask}
/>


    
      
    </>
  );
}

export default Dashboard;

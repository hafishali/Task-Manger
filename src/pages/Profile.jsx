import React, { useEffect, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBTypography, MDBCardText } from 'mdb-react-ui-kit';
import '../css/profile.css'
import user_logo from '../assets/freepik-export-20241019050111fQpS.png'
import { getProfile } from '../services/api';
import Header from '../components/Header';

function Profile() {
    const[userData,setUserData]=useState()

    const getUserProfile=async()=>{
        try {
         
          const response=await getProfile()
          console.log(response.data)
          if(response.status===200){
           setUserData(response.data)
          } 
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(()=>{
        getUserProfile()
      },[])
      console.log(userData)
  return (
    <>
    <Header/>
       <section className="vh-100" >
        <h1 className='text-center mt-3'>Your <span className='text-primary'>Profile</span> </h1>
     {userData? <MDBContainer className="py-5 h-100" >
        <MDBRow className="justify-content-center align-items-center h-100" >

           <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem',backgroundColor:"#A09CA7" }} >
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src={user_logo}
                    alt="Avatar" className="my-5" style={{ width: '100px' }} fluid /> 
                </MDBCol>
                <MDBCol md="8">
                 <MDBCardBody className="p-4 text-light">
                        <MDBTypography className='mb-3' tag="h6">First Name:{userData.first_name}</MDBTypography>
                        <MDBTypography className='mb-3' tag="h6">Last Name:{userData.last_name}</MDBTypography> 
                        <MDBTypography className='mb-3' tag="h6">Username:{userData.username}</MDBTypography> 
                        <MDBTypography className='mb-3' tag="h6">Email:{userData.email}</MDBTypography>  
                  </MDBCardBody>: 
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer> : ""}
    </section>
    </>
  )
}

export default Profile

import React from 'react'
import { useEffect,useState } from 'react'
import store from '../../store'
import {handleUnauthenticatedUserVisit} from "../../utils/UserAuthUtils"
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import Alert from "../Alert";
import {stage, configs } from "../../Constants";
import qs from "qs";
import axios from "axios";

import './userprofile.css'
export default function UserProfile() {
    const [user, setUser] = useState(store.getState().user)
    const [userRevisionSchedule, setuserRevisionSchedule] = useState('')
    const [userProfileFromdb, setuserProfileFromdb] = useState(null)

    // states to manage alerts 
    const [alertType, setalertType] = useState("success")
    const [IsAlertEnabled, setIsAlertEnabled] = useState(false)
    const [AlertText, setAlertText] = useState("")
    const REVISION_SCHEDULE_MIN_LENGTH_MESSAGE="Revision schedule should be >5 characters length"

    const toggleAlert =(boolean,alertType,message)=>{
      setIsAlertEnabled(boolean)
      setalertType(alertType)
      setAlertText(message)
}
    const handleUpdateUserProfile =(e)=>{
      if (userRevisionSchedule.length <5){
        toggleAlert(true,"danger",REVISION_SCHEDULE_MIN_LENGTH_MESSAGE)
        return ;
      }

      // send post request to update user profile

      const body = {
        'username' : user.userEmail,
        'userProfile' :{
          'revisionPattern' : userRevisionSchedule
        }
      }
      const headers = { 
        'Content-Type': 'application/json',
         "Authorization" : `Bearer ${user.jwtToken}`
      }
      const endpoint = configs[stage]['endpoint']+"/api/update-user-profile"
      const config ={
        method: 'post',
        url: endpoint,
        headers: headers,
        data : body
      }
    console.log(config)
    axios(config).then(data=>{
      toggleAlert(true,"success" , "Successfully saved")
  })
  .catch(err=>{
      toggleAlert(true,"danger" , "Error while saving data  : "+err.response.data.message)
  })

    }

    const getUserProfile=(userEmail)=>{
      
      const headers = { 
        'Content-Type': 'application/json',
         "Authorization" : `Bearer ${user.jwtToken}`
      }
      const endpoint = configs[stage]['endpoint']+"/api/get-user-profile/"+userEmail;
      const config ={
        method: 'get',
        url: endpoint,
        headers: headers,
      }
      axios(config).then(data=>{
        console.log(data.data.userProfile)
        setuserProfileFromdb(data.data.userProfile)
        console.log("From db",userProfileFromdb)

      }).catch(err=>{
        console.log(err)
      })


    }

    useEffect(() => {
      handleUnauthenticatedUserVisit(user)
      console.log("changed");
      
    }, )

    useEffect(() => {
      toggleAlert(false,"success","")
    },[userRevisionSchedule] )

    useEffect(() => {
      toggleAlert(false,"success","")
      getUserProfile(user.userEmail)
    },[] )
    
  return (
    <div>

      <MDBContainer className="my-5 d-flex flex-column col-12 col-lg-6 ">
            <h2 className='primary signup_text mx-auto p-10'>User profile </h2>
          <MDBInput onChange={(e)=>{setuserRevisionSchedule(e.target.value)}}  wrapperClass='mb-4'
          label={`Revision Schedule pattern  : ${userProfileFromdb!=null && userProfileFromdb.revisionPattern} `} id='form2' 
          type='text'
          placeholder={userProfileFromdb!=null && userProfileFromdb.revisionPattern}
          />

          <MDBBtn   className="mb-4 mx-auto col-lg-6 col-8" onClick={(e)=>handleUpdateUserProfile(e)} > Save</MDBBtn>

          <div className='d-flex justify-content-between mx-auto' style={{width: '100%'}}>
            {IsAlertEnabled && <Alert type={alertType} message={AlertText} />}
        </div>

    </MDBContainer>
    </div>
  )
}

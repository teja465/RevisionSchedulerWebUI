import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import store from '../../store'
import UserLearningItem from './UserLearningItem'
import {stage, configs } from "../../Constants";
import CreateLearningItemForm from './createLearningItem/createlearningitemform'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove';
import "./mylearnings.css"
export default function Mylearnings() {
    const [userState, setUserState] = useState(store.getState().user)
    const items = []
    const [learningItemsList, setLearningItemsList] = useState(items)
    const [isCreateItemFormVisible, setIsCreateItemFormVisible] = useState(false)

    useEffect(() => {
      console.log("page reloaded fetching users learning items")
      const endpoint = configs[stage]['endpoint']
      const headers= {
        "content-type" : "application/json",
        "Authorization" : `Bearer ${userState.jwtToken}`
      }
      const requestConfigs={
            method: 'get',
            url: endpoint+'/api/user-learning-item',
            withCredentials: false,
            headers:headers
      }
      console.log(requestConfigs)
      axios(requestConfigs)
      .then((data)=>{
        console.log("fetched learning items ",data.data)
        setLearningItemsList(data.data)
      })
      .catch(err=>{
        console.log("error while fetching learning items ",err)
        if (err.code =="ERR_NETWORK"){
            alert(" backend seems down, not able to fetch data")

        }
      })
      return () => {
      }
    }, [])

    const handleUnauthenticatedUserVisit = (userState)=>{
        // if ( !userState.isLoggedIn){
        //     alert("Please login to acces learning items")
        //     window.location.replace("/login")
        // }
    }
    store.subscribe(()=>{
        setUserState(store.getState().user)
        if ( !store.getState().user.isLoggedIn) {
            handleUnauthenticatedUserVisit(userState)
        }
    })

    useEffect(() => {
        handleUnauthenticatedUserVisit(userState)
        return () => {
        }
      },)
    
  return (
    <div className='d-flex flex-column'>
      { userState.isLoggedIn && !isCreateItemFormVisible?<Button className='show_form'  onClick={()=>setIsCreateItemFormVisible(true)}> 
      <AddIcon  />  Create revision item</Button>
      :userState.isLoggedIn && <Button className='hide_form'  onClick={()=>setIsCreateItemFormVisible(false
        )} > <RemoveIcon />  Close</Button> }
      
       {isCreateItemFormVisible && <CreateLearningItemForm  jwtToken={userState.jwtToken}/> }
        
        {learningItemsList.map((ele,ind)=><  UserLearningItem key={ind}  item={ele}/>)}
        {!userState.isLoggedIn && <p className='login_message' >Please login to check your revision schedules</p>}
    </div>
  )
}

import React,{useState} from 'react'
import { TextField,Button } from '@mui/material'
import "./createlearningitemform.css"
import Alert from '../../Alert'
import {stage, configs } from "../../../Constants";
import axios from "axios";

export default function CreateLearningItemForm({jwtToken}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [alertType, setalertType] = useState("success")
    const [IsAlertEnabled, setIsAlertEnabled] = useState(false)
    const [AlertText, setAlertText] = useState("")

    const toggleAlert =(boolean,alertType,message)=>{
        setIsAlertEnabled(boolean)
        setalertType(alertType)
        setAlertText(message)
}

    const handleFormSubmit=()=>{
        if (title.length ==0 || description.length == 0){
            toggleAlert(true,"danger" , "Title  or Description cant be empty")
            return;
        }
        if (title.length <5 || description.length == 10){
            toggleAlert(true,"danger" , "Title size must be > 5 and Description size must be > 10 characters")
            return;
        }
        toggleAlert(false,"" , "")

        // make post request to save item
        const endpoint = configs[stage]['endpoint']+"/api/user-learning-item"
        var config = {
            method: 'post',
            url: endpoint,
            headers: { 
              'Content-Type': 'application/json',
               "Authorization" : `Bearer ${jwtToken}`
            },
            data : {title,description}
          };
        console.log(config)
        axios(config).then(data=>{
            console.log("Success ",data.data)
            toggleAlert(true,"success" , "Successfully saved")
        })
        .catch(err=>{
            console.log("Error ",err)
            toggleAlert(true,"danger" , "Error while saving data "+err.message)
        })

    }
  return (
    <div  className='create_user_learning_item_form col-11 text-center col-lg-8 mx-auto mt-2'>

        <TextField className='textfield' fullWidth 
            label="title" onChange={(e)=>setTitle(e.target.value.trim())} />

        <TextField className='textfield' fullWidth 
        margin='normal' label="Description"
        onChange={(e)=>setDescription(e.target.value.trim())}   />
        <Button onClick={()=>handleFormSubmit()} className="save_button mb-4 mx-auto col-lg-6 col-8" variant="contained">save</Button>

        <div className='d-flex justify-content-between mx-auto' style={{width: '100%'}}>
            {IsAlertEnabled && <Alert type={alertType} message={AlertText} />}
        </div>
    </div>
  )
}

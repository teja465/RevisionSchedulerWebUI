import React,{useState} from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './register.css'
import { ValidateEmailAddress } from "../../utils";
import {stage, configs } from "../../Constants";
import axios from "axios";
import Alert from "../Alert";
function RegisterUser() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [nickName, setNickName] = useState("second") 
    const [formValidationFailedMessage, setformValidationFailedMessage] = useState("")
    const [isValidationFailed, setisValidationFailed] = useState(false)
    const [isRegisterBtnVisisble, setisRegisterBtnVisisble] = useState(true)
    const [registerBtnText, setregisterBtnText] = useState("Register")

    const [alertType, setalertType] = useState("success")
    const [IsAlertEnabled, setIsAlertEnabled] = useState(false)
    const [AlertText, setAlertText] = useState("")

    const handleFormValidationFailure=(errorMessage)=>{
        throw errorMessage
    }
    const callRegisterApi = ()=>{
        setisRegisterBtnVisisble(false)
        setregisterBtnText("Registering user ... ")
        const headers= {
            "content-type": "application/json",
          }
        const data={
            "username":username,
            "password":password
        }
        const requestType='post';
        const endpoint =configs[stage]['endpoint']

        axios({
            method: requestType,
            url: 'http://localhost:8080/api/signup',
            withCredentials: false,
            'data': data,
            headers:headers
        }).then(data=>{
            console.log("Request sent successfully");
            console.log(data)
            if(data.status == 201){
                console.log("user created successfully")

                setAlertText("user created successfully")
                setIsAlertEnabled(true)
                setalertType("success")
            }
            
        }).catch(err=>{
            console.log("Error while making register api post call")
            console.log(err)
            if (data.status=422){
                console.log("user not created ",err.response.data)
                
                setAlertText(err.response.data.message)
                setIsAlertEnabled(true)
                setalertType("danger")
            }
        })
        setisRegisterBtnVisisble(true)
        setregisterBtnText("Register")
    }
    const handleRegisterClick = ()=>{
        console.log("clicked register user");
        try{
            if( !ValidateEmailAddress(username) ){
                handleFormValidationFailure('Email address not in required format')
            }
            if(password != confirmPassword){
                handleFormValidationFailure('Passowrds not matching')
            }
            if (username.trim().length ==0 || password.trim().length == 0 || nickName.trim().length ==0){
                handleFormValidationFailure('All fields are mandatory to fill')
            }
            setformValidationFailedMessage("")
            callRegisterApi()
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <MDBContainer className=" my-5 d-flex flex-column col-12 col-lg-6 ">
        <h2 className='signup_text mx-auto p-10'>Signup to get started </h2>
      
      <MDBInput onChange={(e)=>{setusername(e.target.value)}} wrapperClass='mb-4' label='User Name john@foo.com' id='form1' type='email'/>
      <MDBInput onChange={(e)=>{setNickName(e.target.value)}} wrapperClass='mb-4' label='First name' id='form1' type='email'/>
      <MDBInput onChange={(e)=>{setpassword(e.target.value)}} wrapperClass='mb-4' label='Password' id='form2' type='password'/>
      <MDBInput onChange={(e)=>{setconfirmPassword(e.target.value)}} wrapperClass='mb-4' label='Confirm Password' id='form2' type='password'/>

      <MDBBtn onClick={(e)=>handleRegisterClick(e)} className="mb-4 mx-auto col-lg-6 col-8" disabled={isRegisterBtnVisisble?"":"false"}>{registerBtnText}</MDBBtn>

      <div className="text-center">
        <p>didn't spent much on security , make sure to use strong password.
            And dont forget your passowrd 
        </p>

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>
        </div>
      </div>
      {formValidationFailedMessage.trim() != '' && <div class="alert alert-danger" role="alert">
        {formValidationFailedMessage}
        
      </div> }
      {IsAlertEnabled && <Alert type={alertType} message={AlertText} />}


    </MDBContainer>
  );
}

export default RegisterUser;
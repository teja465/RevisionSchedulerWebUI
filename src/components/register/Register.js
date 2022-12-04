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
    const [nickName, setNickName] = useState() 
    const [formValidationFailedMessage, setformValidationFailedMessage] = useState("")
    const [isValidationFailed, setisValidationFailed] = useState(false)
    const [isRegisterBtnVisisble, setisRegisterBtnVisisble] = useState(true)
    const [registerBtnText, setregisterBtnText] = useState("Register")
    const [isRegisterBtnEnabled, setisRegisterBtnEnabled] = useState(true)

    const [enableOTPTextbox, setenableOTPTextbox] = useState(false)
    const [enableOtpValidateBtn, setenableOtpValidateBtn] = useState(false)
    const [otp, setOtp] = useState("")

    const [alertType, setalertType] = useState("success")
    const [IsAlertEnabled, setIsAlertEnabled] = useState(false)
    const [AlertText, setAlertText] = useState("")

    

    const handleFormValidationFailure=(errorMessage)=>{
        // console.log("in handleFormValidationFailure",errorMessage)
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
        console.log("Calling ",data,endpoint+'api/signup')
        axios({
            method: requestType,
            url: endpoint+'/api/signup',
            withCredentials: false,
            'data': data,
            headers:headers
        }).then(data=>{
            if(data.status == 201){
                setAlertText("Sent otp via email , please submit otp  below")
                setIsAlertEnabled(true)
                setalertType("success")
                setenableOTPTextbox(true)
                setisRegisterBtnVisisble(false)
                setisRegisterBtnEnabled(false)
            }
        }).catch(err=>{
            if (data.status=422){
                console.log("got 422 response ",err)
                
                setAlertText(err.response.data.message)
                setIsAlertEnabled(true)
                setalertType("danger")
            }
        })
        setisRegisterBtnVisisble(true)
        setregisterBtnText("Register")
    }
    const handleRegisterClick = ()=>{
        try{
            if( !ValidateEmailAddress(username) ){
                handleFormValidationFailure('Email address not in required format')
            }
            if(password != confirmPassword){
                handleFormValidationFailure('Passwords not matching')
            }
            if(password.length <=10){
                handleFormValidationFailure(' Password length is too short.Minimum size is 10')
            }

            if (username.trim().length ==0 || password.trim().length == 0 || nickName.trim().length ==0){
                handleFormValidationFailure('All fields are mandatory to fill')
            }
            if (username.trim() == nickName.trim()){
                handleFormValidationFailure('Username and nick name cant be same')
            }
            setformValidationFailedMessage("")
            callRegisterApi()
        }
        catch(err){
            setAlertText(err)
                setIsAlertEnabled(true)
                setalertType("danger")
        }
    }
    const handleValidateOTPclick=()=>{
        console.log("otp is ",otp);
        const headers= {
            "content-type": "application/json",
          }
        const params={
            "userEmail":username,
            "otp":otp
        }
        const requestType='post';
        const endpoint =configs[stage]['endpoint']+'/api/validate-user'
        console.log("Calling ",endpoint+'/api/validate-user')
        axios.post(endpoint,null,{params})
        .then(data=>{
            console.log(data)
            setAlertText(data.data+" Please login")
            setIsAlertEnabled(true)
            setalertType("success")
        })
        .catch(err=>{
            console.log(err)
            setAlertText(err.response.data)
            setIsAlertEnabled(true)
            setalertType("danger")
        })
    }
  return (
    <MDBContainer className="my-5 d-flex flex-column col-12 col-lg-6 ">
        <h2 className='primary signup_text mx-auto p-10'>Signup to get started </h2>
      
      <MDBInput onChange={(e)=>{setusername(e.target.value.trim())}} wrapperClass='mb-4' label='User Name john@foo.com' id='form1' type='email'/>
      <MDBInput onChange={(e)=>{setNickName(e.target.value.trim())}} wrapperClass='mb-4' label='First name' id='form1' type='email'/>
      <MDBInput onChange={(e)=>{setpassword(e.target.value.trim())}} wrapperClass='mb-4' label='Password' id='form2' type='password'/>
      <MDBInput onChange={(e)=>{setconfirmPassword(e.target.value.trim())}} wrapperClass='mb-4' label='Confirm Password' id='form2' type='password'/>

      { isRegisterBtnEnabled && <MDBBtn onClick={(e)=>handleRegisterClick(e)} className="mb-4 mx-auto col-lg-6 col-8" disabled={isRegisterBtnVisisble?"":"false"}>{registerBtnText}</MDBBtn>}

      <div className="text-center">
       

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>
        </div>
      </div>
      
      {IsAlertEnabled && <Alert type={alertType} message={AlertText} />}
      {enableOTPTextbox && <MDBInput onChange={(e)=>{setOtp(e.target.value)}} wrapperClass='mb-4' label='enter otp' id='email_otp' type='text'/>} 
      {enableOTPTextbox &&  <MDBBtn onClick={(e)=>{handleValidateOTPclick()}} className="mb-4 mx-auto col-lg-6 col-8" >validate otp</MDBBtn>} 


      {formValidationFailedMessage.trim() != '' && <div class="alert alert-danger" role="alert">
        {formValidationFailedMessage}
      </div> }

      <p>didn't spent much on security , make sure to use strong password.
            And dont forget your passowrd 
        </p>
    </MDBContainer>
  );
}
export default RegisterUser;
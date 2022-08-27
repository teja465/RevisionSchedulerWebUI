import React,{useState,useEffect} from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
    MDBIcon
  }
from 'mdb-react-ui-kit';
import Alert from "../Alert";
import {stage, configs } from "../../Constants";
import axios from "axios";
import qs from "qs";
import { setCookie,getCookie ,deleteCookie} from "../../utils/CookieManager";
import { handleFormValidationFailure } from "../../utils/CommonUtils";

import { useSelector, useDispatch } from 'react-redux'
import { logInUser , logOutUser ,initialState  } from "../../reducers/userSlice";

function LoginForm() {
    const user = useSelector( state => state.user)
    const dispatch = useDispatch()
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")

    const [alertType, setalertType] = useState("success")
    const [IsAlertEnabled, setIsAlertEnabled] = useState(false)
    const [AlertText, setAlertText] = useState("")

    const [isRegisterBtnVisisble, setisRegisterBtnVisisble] = useState(true)
    const [registerBtnText, setregisterBtnText] = useState("Register")
    const loginCookies=["user_email","jwt_token"]

    const sendLoginApiRequest=()=>{
      console.log("Send login api request")

      setisRegisterBtnVisisble(false)
      setregisterBtnText("Logging in")

      const endpoint = configs[stage]['endpoint']+"/api/login"

      const body={
        'username':UserName,
        'password':Password
      }
      const headers= {
        "content-type": "application/x-www-form-urlencoded",
      }

      var data = qs.stringify({
        'username': UserName,
        'password':Password 
      });
      var config = {
        method: 'post',
        url: 'http://localhost:8080/api/login',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      console.log(data)

      axios(config)
      .then(function (response) {
        if (response.status == 200){

          setAlertText("Logged in successfully .")
          setIsAlertEnabled(true)
          setalertType("success")
          const body = JSON.parse(response.request.response);
          const jwt_cookie =`access_token=${body["access_token"]}`
          setCookie('jwt_token',body['access_token'],5)
          setCookie('user_email',UserName,5)
          dispatch(logInUser({
            isLoggedIn :true,
            jwtToken: body['access_token'],
            userEmail:UserName,
          }))

        }
        else if (response.status == 401){
          console.error('User credentails not match',initialState)
          dispatch(logInUser(initialState))
        }


      })
      .catch(function (error) {
        console.log("in catch block",error);
        setAlertText("Login attempt failed .Please provide valid credentials")
        setIsAlertEnabled(true)
        setalertType("danger")
        console.error('User credentails not match')
        dispatch(logOutUser(initialState))
        
        loginCookies.forEach(element => {
          deleteCookie(element)
          console.log("deleted cookie ",element)
        });

      });
      
      setisRegisterBtnVisisble(true)

    }
    const handleLoginSubmit=(e)=>{
        try{
            if (UserName.trim().length ==0 || Password.trim().length ==0){
                handleFormValidationFailure("Username or Password cant be empty")
                return ;
            }
            sendLoginApiRequest()

        }
        catch(err){
            setIsAlertEnabled(true)
            setalertType("danger")
            setAlertText(err)


        }


    }
    
    
  return (
    <MDBContainer className="my-5 d-flex flex-column col-12 col-lg-6 ">
        <h2 className='primary signup_text mx-auto p-10'>Login </h2>
        {/* {user.isLoggedIn? <h3>user logged in </h3>:<h3>user not logged in</h3>} */}
      <MDBInput onChange={(e)=>{setUserName(e.target.value.trim())}}  wrapperClass='mb-4' label='User Name john@foo.com' id='form1' type='email'/>
      <MDBInput onChange={(e)=>{setPassword(e.target.value.trim())}} wrapperClass='mb-4' label='Password' id='form2' type='password'/>

      <MDBBtn onClick={(e)=>{handleLoginSubmit(e)}}  disabled={isRegisterBtnVisisble?"":"false"} className="mb-4 mx-auto col-lg-6 col-8" >{registerBtnText}</MDBBtn>

      <div className="text-center">
        <p>didn't spent much on security , make sure to use strong password.
            And dont forget your passowrd 
        </p>

        <div className='d-flex justify-content-between mx-auto' style={{width: '100%'}}>
            {IsAlertEnabled && <Alert type={alertType} message={AlertText} />}

        </div>
      </div>
    </MDBContainer>
  );
}

export default LoginForm;
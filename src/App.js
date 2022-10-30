import './App.css';
import ResponsiveAppBar from "./components/navbar/ResponsiveNavBar";
import LoginForm from './components/login/LoginForm';
import RegisterUser from "./components/register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCookie } from './utils/CookieManager';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { logInUser } from './reducers/userSlice';
import Mylearnings from './components/learningsFeed/Mylearnings';
import UserProfile from './components/profile/UserProfile';
import HomePage from './HomePage';
function App() {
  const dispatch = useDispatch()
  if( (getCookie("jwt_token") != '') && getCookie("user_email")!='' ){
    // Todo :validate credentails before setting 
    dispatch(logInUser({
      isLoggedIn :true,
      jwtToken: getCookie("jwt_token"),
      userEmail:getCookie("user_email"),
    }))
  }

  useEffect(() => {

    return () => {
    }
  }, [])
  return (
    <div className="App">
      <ResponsiveAppBar />

      <BrowserRouter>
      <Routes path="/" element={<RegisterUser />}>
          <Route path="signup" element={<RegisterUser/>} />
          <Route path="login" element={<LoginForm/>} />
          <Route path ="my-learnings" element={<Mylearnings />}/>
          <Route path ="profile" element={< UserProfile/>}/>
          <Route path ="" element={< HomePage/>}/>
      </Routes>
      </BrowserRouter>
      {/* <LoginForm /> */}
    </div>
  );
}

export default App;
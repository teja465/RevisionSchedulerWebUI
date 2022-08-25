import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from "./components/navbar/ResponsiveNavBar";
import LoginForm from './components/login/LoginForm';
import RegisterUser from "./components/register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />

      <BrowserRouter>
      <Routes path="/" element={<RegisterUser />}>
          <Route path="signup" element={<RegisterUser/>} />
          <Route path="login" element={<LoginForm/>} />
      </Routes>
      </BrowserRouter>
      {/* <LoginForm /> */}
    </div>
  );
}

export default App;
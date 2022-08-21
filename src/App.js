import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from "./components/navbar/ResponsiveNavBar";
import LoginForm from './components/login/LoginForm';
import RegisterUser from "./components/register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      {/* <LoginForm /> */}
      <RegisterUser />
    </div>
  );
}

export default App;
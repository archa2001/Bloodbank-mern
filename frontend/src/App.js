import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./Components/Home"
import Register from "./Components/Register"
import { useState } from 'react';
import { mycontx } from './Components/Context';
import Donation from './Components/Donate';
import Login from './Components/Login';
import Request from './Components/Request';
import Adminlogin from './Components/Adminlogin';
import Admin from './Components/Admin';
import About from './Components/About';

function App() {
  const[email,setMail]=useState("");
  const[name,setName]=useState("");
  const[password,setPassword]=useState("");
  const[confirm,setConfirm]=useState("");
  const[bloodGroup,setBlood]=useState("");
  const [logUser,setLogUser]=useState([])
  const values={email,setMail,name,setName,password,setPassword,confirm,setConfirm,bloodGroup,setBlood,logUser,setLogUser}
  return (
    <div className="App">
  
    <BrowserRouter>
    <mycontx.Provider value={values}>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/Register' element={<Register/>}/>
  <Route path='/Donate' element={<Donation/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/Request' element={<Request/>}/>
  <Route path='/admin' element={<Adminlogin/>}/>
  <Route path='/adminc' element={<Admin/>}/>
  <Route path='/about' element={<About />}/>

</Routes>
</mycontx.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
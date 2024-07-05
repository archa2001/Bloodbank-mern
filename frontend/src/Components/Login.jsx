import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { mycontx } from './Context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Login.css';

export default function Login() {
    const { email, setMail, password, setPassword, setLogUser } = useContext(mycontx);

    const LoginUser = { email, password };
    console.log("login Users", LoginUser);

    const nav = useNavigate();

    const log = async () => {
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }
        setLogUser(LoginUser);
        try {
            const response = await axios.post("http://localhost:8000/user/login", {
                email, password
            });
            if (response.status === 200) {
                alert("Login successfully");
                nav("/");
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
      <div className='login-body'>
        <div className='login-container'>
            <div className='login-card'>
                <h1 className='login-title'>Login</h1>
                <div className='login-form'>
                    <input
                        type="email"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setMail(e.target.value)}
                        className='login-input'
                    /><br />
                    <input
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='login-input'
                    /><br /><br />
                    <button onClick={log} className='login-button'>Login</button>
                    <h5 className='login-register-link'>
                        Don't have an account? <Link to='/Register'>Register Here</Link>
                    </h5>
                </div>
            </div>
        </div>
        </div>
    );
}

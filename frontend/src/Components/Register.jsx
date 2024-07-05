import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { mycontx } from './Context';
import '../CSS/Register.css';

function Register() {
  const { email, setMail, name, setName, password, setPassword, confirm, setConfirm, bloodGroup, setBlood } = useContext(mycontx);
  const nav = useNavigate();

  useEffect(() => {
    document.body.classList.add('register-body');
    return () => {
      document.body.classList.remove('register-body');
    };
  }, []);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const Registerbtn = async () => {
    if (!name || !email || !password || !confirm || !bloodGroup) {
      alert("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      alert("Invalid email format");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/user/register", {
        name, email, password, confirm, bloodGroup
      });
      if (response.status === 201) {
        alert("Registration successful");
        nav("/Login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        if (error.response.status === 400 && error.response.data.message === 'Email is already registered') {
          alert("Email is already registered");
        } else {
          alert("Registration failed");
        }
      } else {
        console.error("Error:", error.message);
        alert("Registration failed due to a network or server error");
      }
    }
  };

  return (
    <div className='register-page'>
      <div className="register-container">
        <h1 className="register-title">Sign Up</h1>
        <div className="input-container">
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="register-input"
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setMail(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            value={confirm}
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
            className="register-input"
          />
          <select
            value={bloodGroup}
            onChange={(e) => setBlood(e.target.value)}
            className="register-input"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <button className="register-button" onClick={Registerbtn}>
            Submit
          </button>
          <Link to='/login' className="login-link">Skip to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

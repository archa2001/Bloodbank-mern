import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Adminlogin.css'

export default function Adminlogin() {
    const [adminemail, setAdminemail] = useState("");
    const [adminpas, setAdminpass] = useState("");
    const nav = useNavigate();

    const submit = async () => {
        try {
            const response = await axios.post("http://localhost:8000/admin/adminlogin", {
                adminemail,
                adminpas
            });

            if (response.status === 200) {
                alert("Login successful");
                nav("/adminc");
            } else {
                alert("Incorrect Credentials");
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="admin-form-container">
            <h2 className="heading">Admin Login</h2>
            <input
                type="text"
                className="admin-input"
                placeholder="USERNAME"
                value={adminemail}
                onChange={(e) => setAdminemail(e.target.value)}
            />
            <br />
            <input
                type="password"
                className="admin-input"
                placeholder="PASSWORD"
                value={adminpas}
                onChange={(e) => setAdminpass(e.target.value)}
            />
            <br />
            <button className="admin-button" onClick={submit}>
                Login
            </button>
        </div>
    );
}
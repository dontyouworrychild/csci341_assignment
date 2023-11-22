
import React, { useState } from "react"
import './Login.css'
import {useNavigate} from 'react-router-dom';
// import { useUser } from "../UserContext";
const url = "http://77.243.80.52:8001";
export default function (props) {

  // const {setUserRole} = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${url}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const {access, refresh} = data;
        
        try {
          const user_info_response = await fetch(`${url}/api/user_info/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json"
            }
          })
          if (user_info_response.ok) { 
            const result = await user_info_response.json();
            const localStorage_data = result
            localStorage.setItem('user', JSON.stringify(localStorage_data));
            localStorage.setItem('token', access);
            navigate('/home');
            window.location.reload(false);
            

          } else {
            console.log("Error in making the request")
          }
      } catch(error) {
        console.log(error);
      }
        

        // const { access, refresh } = data;



      } else {
        // Handle error (e.g., display an error message)
        setError("Wrong email address or password")
        setTimeout(() => {
          setError("");
        }, 3000);
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span style={{color: "red"}}>{error}</span>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
}

import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from 'axios';
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from '../../../services/url'

export default function Login() {

  // Initializing a navigation variable to be used for navigating to other pages
  const navigate = useNavigate();

  // Initializing user state with empty username and password fields
  const [user, setUser] = useState({
    username: "", password: ""
  })

  // Function to handle user input changes
  const handleInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  // Function to handle user login on form submission
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      // Making a post request to the login endpoint with user data and setting headers for content-type
      const response = await axios.post(`${BASE_URL}/login/post`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Extracting user token, id and admin status from the response data
      const token = response.data.token;
      const id = response.data.id;
      const is_admin = response.data.is_admin;

      // Storing user data in local storage
      localStorage.setItem("user", token);
      localStorage.setItem("id", id);
      localStorage.setItem("is_admin", is_admin);

      // Navigating to the home page
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center"
      });
    }
  }


  return (
    <body style={{ backgroundColor: 'hsl(218, 41%, 15%)' }}>
      <section className="background-radial-gradient overflow-hidden login">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
              <h1 className="my-5 display-5 fw-bold ls-tight">
                WELCOME TO <br />
                <span>SMART ACTIVITY CALENDAR</span>
              </h1>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative mt-1">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
              <div className="card bg-glass login-card">
                <h1 className="fw-bold mb-5 text-center mt-4" style={{ color: "#00008b" }}>Login </h1>
                <div className="card-body px-4 px-md-5">
                  <form>
                    <div className="form-floating mb-4">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="username"
                        name="username"
                        value={user.username}
                        onChange={handleInput}
                      />
                      <label className="form-label" htmlFor="floatingInput">
                        Enter Username
                      </label>
                    </div>
                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                      />
                      <label className="form-label" htmlFor="floatingInput">
                        Enter Password
                      </label>
                    </div>
                    <div className="text-center py-2">
                      <NavLink className="nav-link" to="/register">
                        Click here to Register
                      </NavLink>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary btn-block mb-4 w-100"
                      onClick={loginUser}
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
      </body>
  );

}

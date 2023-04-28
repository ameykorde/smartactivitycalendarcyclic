import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import './Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../services/url'

function register() {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const [user, setUser] = useState({
        name: "", username: "", id: "", password: "", cpassword: ""
    })

    // Function to update the user state when user inputs values
    const handleInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    // Function to handle password input and error message
    const handlePassword = (event) => {
        const password = event.target.value;
        setUser({ ...user, password });
        if (password.length !== 6) {
            setErrorMessage('Password must be 6 characters long.');
        } else {
            setErrorMessage('');
        }
    };

    // Function to post data to server when user submits form
    const postData = async (e) => {
        e.preventDefault();
        const { name, username, id, password, cpassword } = user;

        // Validating input data and posting to server
        if (name && username && id && (password === cpassword)) {
            // Passwords match, proceed with registration
            const res = await axios.post(`${BASE_URL}/register`, user)
            if (res.data.error) {
                toast.error(res.data.error, {
                    position: "top-center"
                })
            } else if (res.data.message) {
                navigate("/login");
            } else {
                console.log("error");
            }

        } else {
            // Passwords do not match, show error message
            setErrorMessage('Passwords do not match.');
            toast.error('Passwords do not match.', {
                position: "top-center"
            })
        }
    }




    return (
        <>
            <section className="background-radial-gradient overflow-hidden">

                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 register">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 class="my-5 display-5 fw-bold ls-tight" >
                                WELCOME TO <br />
                                <span>SMART ACTIVITY CALENDAR</span>
                            </h1>

                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">

                                <div className="card-body px-4 py-4 px-md-5">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input name="name" value={user.name} onChange={handleInput} type="text" className="form-control" placeholder="Name" />
                                                    <label className="form-label" htmlFor="floatingInput">Enter name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input name="username" value={user.username} onChange={handleInput} type="text" className="form-control" placeholder="Name" />
                                                    <label className="form-label" htmlFor="floatingInput">Enter Username</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Email input --> */}
                                        <div className="form-floating mb-4">
                                            <input name="id" value={user.id} onChange={handleInput} type="password" className="form-control" placeholder="Name" />
                                            <label className="form-label" htmlFor="floatingInput">Enter ID</label>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input
                                                name="password"
                                                value={user.password}
                                                onChange={handlePassword}
                                                type="password"
                                                className="form-control"
                                                placeholder="Name"
                                                maxLength={6}
                                            />
                                            <label className="form-label" htmlFor="floatingInput">
                                                Enter Password
                                            </label>
                                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input name="cpassword" value={user.cpassword} onChange={handleInput} type="password" className="form-control" placeholder="Name" />
                                            <label className="form-label" htmlFor="floatingInput">Confirm Password</label>
                                        </div>

                                        <div className="text-center py-2">
                                            <NavLink className="nav-link" to="/login">Already Registered User? Click here to login </NavLink>
                                        </div>
                                        {/* <!-- Submit button --> */}
                                        <button type="submit" className="btn btn-lg btn-primary btn-block mb-4 w-100" onClick={postData}>
                                            Register
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default register


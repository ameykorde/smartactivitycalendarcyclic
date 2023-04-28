import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Nav.css";

export default function Navbar({ handleSearch }) {
    // Using useNavigate hook to handle navigation
    const navigate = useNavigate();
    // Creating logout function to clear local storage and redirect user to login page
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg custom-navbar sticky-top" data-bs-theme="dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-list">
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/">
                                Notices
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/classes">
                                Classes
                            </NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/teachers">
                                Teachers
                            </NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/timetable">
                                Time Table
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " to="/academiccalendar">
                                Academic Calendar
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/todo">
                                To-Do-List
                            </NavLink>
                        </li>
                        <li className="nav-item nav-logout" onClick={logout} >
                            Logout
                        </li>
                    </ul>
                    {/* Creating search bar */}
                    <form className="d-flex" role="search" onSubmit={(event) => event.preventDefault()}>
                        <input className="notice-input" type="text" name="input" placeholder="Search" onChange={handleSearch} />
                        <i type="submit" className="fa-solid fa-magnifying-glass"></i>
                    </form>
                </div>
            </div>
        </nav>
    );
}

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Nav.css";

export default function Navbar({ handleSearch }) {
    // useNavigate hook to handle navigation
    const navigate = useNavigate();
    const [theme, setTheme] = useState("light-theme")

    useEffect(() => {
        // Get the theme status from local storage
        const savedTheme = localStorage.getItem("theme");

        // Apply the stored theme status to the body
        document.body.className = savedTheme || "light-theme";
        setTheme(savedTheme || "light-theme");
    }, []);

    // logout function to clear local storage and redirect user to login page
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    // Toggle between theme
    const toggleTheme = () => {
        const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
        document.body.className = newTheme; //set class to index.html-body
        setTheme(newTheme);

        // Store the theme status in local storage
        localStorage.setItem("theme", newTheme);
    };


    return (
        <nav className={`navbar navbar-expand-lg custom-navbar sticky-top`} data-bs-theme="dark">
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
                        <li>
                            <div className="nav-logout" onClick={logout}>
                                Logout
                            </div>
                        </li>
                    </ul>
                    {/* Creating search bar */}
                    <form className="d-flex" role="search" onSubmit={(event) => event.preventDefault()}>
                        <input className="nav-input" type="text" name="input" placeholder="Search" onChange={handleSearch} />
                        <i type="submit" className="fa-solid fa-magnifying-glass"></i>
                        {/* These will be displayed in small devices only: Theme Icon */}
                        <div className="theme-small-device">
                            {theme === 'light-theme' ? (
                                <span className="material-symbols-outlined" title="Switch to Dark Mode" onClick={toggleTheme}>
                                    dark_mode
                                </span>
                            ) : (
                                <span className="material-symbols-outlined" title="Switch to Light Mode" onClick={toggleTheme}>
                                    light_mode
                                </span>
                            )}
                        </div>
                    </form>
                    {/* These will be displayed in large devices only: Theme Icon */}
                    <div className="theme">
                        {theme === 'light-theme' ? (
                            <span className="material-symbols-outlined" title="Switch to Dark Mode" onClick={toggleTheme}>
                                dark_mode
                            </span>
                        ) : (
                            <span className="material-symbols-outlined" title="Switch to Light Mode" onClick={toggleTheme}>
                                light_mode
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

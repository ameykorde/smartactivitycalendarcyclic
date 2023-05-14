import React,{useEffect} from "react"
import { NavLink, useNavigate } from "react-router-dom";
import '../../Navbar/Nav.css'

export default function InputNavbar() {
    
    const navigate = useNavigate(); 

    useEffect(() => {
        // Get the theme status from local storage
        const savedTheme = localStorage.getItem("theme");

        // Apply the stored theme status to the body
        document.body.className = savedTheme || "light-theme";
    }, []);

    // function to log out the user and redirects to the login page.
    function logout() {
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
                            <NavLink className="nav-link"  to="/input/">Notices</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/input/classes">Classes</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/input/teachers">Teachers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " to="/input/absent">Absent Teacher</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/input/timetable">Time Table</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " to="/input/academiccalendar">Academic Calendar</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " to="/input/admin">Admin</NavLink>
                        </li>
                    </ul>
                    
                    {/* This logout button logs out the user on click and redirects to the login page. */}
                    <i className="fa-solid fa-right-from-bracket fa-flip-horizontal fa-2xl" type="button" onClick={logout} title="Logout"></i>
                </div>
            </div>
        </nav>
    )
}

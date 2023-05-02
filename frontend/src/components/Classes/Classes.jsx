import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; 
import Navbar from "../Navbar/Nav";
import './Classes.css'; 
import ClassContent from "./ClassContent";
import axios from 'axios'; // Importing Axios library for making HTTP requests
import { BASE_URL } from "../../../services/url";

export default function Classes() {
  const [data, setData] = useState([]); // State variables for storing fetched data and for setting data
  const navigate = useNavigate(); // Hook for navigating between routes
  const isAdmin = localStorage.getItem('is_admin'); // Checking whether the user is an admin or not

  useEffect(() => { // React hook for fetching data and setting state
    const fetchData = async () => { // Function for fetching data
      try {
        const response = await axios.get(`${BASE_URL}/ongoing/showOngoing`); // Making GET request to the server
        setData(response.data); // Setting the fetched data to the state variable
      } catch (error) {
        console.error(error); 
      }
    };
    if (!localStorage.getItem("user")) { // Checking whether the user is logged in or not
      navigate('/login') // Redirecting the user to login page if not logged in
    } else {
      fetchData(); 
    }
  }, [data]); 

  return (
    <>
      <Navbar /> 
      <div className="classes container">
        <h1>ONGOING - CLASSES</h1> 
        <div className="class-item"> 
          {data.map((item) => ( // Mapping over the fetched data and displaying ClassContent component for each item
            <ClassContent
              subject={item.subject}
              section={item.section}
              semester={item.semester}
              teacher={item.teacher}
              key={item._id}
              id={item._id}
            />
          ))}
        </div>
        {isAdmin === 'true' && // Checking whether the user is an admin or not, if admin button will shown
          <NavLink to="/input/classes"> 
            <button type="button" className="btn btn-light btn-lg plus-button"><i className="fa-solid fa-plus plus-icon "></i></button>
          </NavLink>
        }
      </div>
    </>
  );
}

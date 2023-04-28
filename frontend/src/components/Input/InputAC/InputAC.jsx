import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import InputNavbar from '../InputNavbar/InputNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import UpdateDelete from './UpdateDelete';
import {BASE_URL} from '../../../../services/url'

export default function InputAC() {
  // Set initial states
  const [name, setName] = useState('');
  const [file, setFile] = useState('');

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create a new FormData object and append name and file
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    try {
      // Send POST request to server with formData
      const response = await axios.post(`${BASE_URL}/calendar/post`, formData);
      console.log(response.data);
      // Show success message
      toast.success('Calendar added successfully!');
    } catch (error) {
      console.error(error);
      // Show error message
      toast.error('Failed to add Calendar!');
    }
  };

  return (
    <>
      <InputNavbar />
      <div className='container'>
        <h1>ACADEMIC CALENDAR</h1>
      </div>
      {/* Form to add academic calendar */}
      <form className="input my-5" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="input-group mb-3 me-3">
          <span className="input-group-text">Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="input-group mb-3 tt-upload">
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload 
        </button>
      </form>

      {/* Component to update and delete academic calendars */}
      <UpdateDelete/>
      
      {/* Navigation link to go back to academic calendar page */}
      <NavLink to="/academiccalendar">
        <button type="button" className="btn btn-light btn-lg plus-button check-button"><i className="fa-solid fa-check plus-icon "></i></button>
      </NavLink>
      <ToastContainer/>
    </>
  )
}

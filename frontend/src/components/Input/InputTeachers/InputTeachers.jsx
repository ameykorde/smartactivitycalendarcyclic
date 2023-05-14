import React, { useState } from 'react'; 
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import InputNavbar from '../InputNavbar/InputNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateDelete from './UpdateDelete';

function InputTeachers() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null); // Initialize file state to null

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', file);
    
    try {
      const response = await axios.post(`/teacher/post`, formData);
      console.log(response.data);
      toast.success('Data added successfully!');
      // Reset form and file input after successful submission
      setName('');
      setEmail('');
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add Data!');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set file state to selected file
  };

  return (
    <>
      <InputNavbar /> 
      <div className="container">
        <h1>Teachers Time Table</h1>
      </div>
      <form className="input-card container" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="input-group mb-3 me-3 ">
          <span className="input-group-text">Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="input-group mb-3 me-3 ">
          <span className="input-group-text">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="input-group mb-3 tt-upload">
          <input
            type="file"
            name="file"
            onChange={handleFileChange} // Call handleFileChange on file input change
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>

      <UpdateDelete/>
            
      <NavLink to="/teachers">
        <button type="button" className="btn btn-light btn-lg plus-button check-button">
          <i className="fa-solid fa-check plus-icon "></i>
        </button>
      </NavLink>
      <ToastContainer />
    </>
  );
}

export default InputTeachers;

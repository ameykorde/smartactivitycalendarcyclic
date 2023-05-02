import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // For displaying success/error messages
import 'react-toastify/dist/ReactToastify.css'; // Styling for toast messages
import UpdateDelete from './UpdateDelete';
import InputNavbar from '../InputNavbar/InputNavbar';
import './InputClasses.css';
import {BASE_URL} from '../../../../services/url'

const AddOngoing = () => {
  // Initialize state variables for form inputs
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [day, setDay] = useState(0);
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Define handleSubmit function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create new ongoing class in database
      await axios.post(`${BASE_URL}/ongoing/createNewOngoing`, {
        semester,
        section,
        day,
        subject,
        teacher,
        startTime,
        endTime,
      });
      toast.success("Data Added Successfully");
    } catch (error) {
      toast.error("All Fields are Required");
    }
  };
  return (
    <>
      <InputNavbar />
      <div className='container input-class text-center'>
        <h1 className='my-4'>Add Class</h1>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <form onSubmit={handleSubmit} className='input-classes-card py-4 px-4' >
              <div className='d-flex'>
                <div className='form-group w-50  '>
                  <label htmlFor='semester'>Semester</label>
                  <select
                    className='form-control'
                    id='semester'
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <option value=''>Select Semester</option>
                    {[...Array(8).keys()].map((n) => (
                      <option key={n} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='form-group w-100' style={{ marginLeft: "8.5%" }}>
                  <label htmlFor='section' style={{ marginRight: "50%" }}>Section</label>
                  <select
                    className='form-control w-50'
                    id='section'
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                  >
                    <option value=''>Select Section</option>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                    <option value='D'>D</option>
                  </select>
                </div>
                <div className='form-group w-50' style={{ marginLeft: "-20%" }}>
                  <label htmlFor='day'>Day</label>
                  <select
                    className='form-control'
                    id='day'
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    <option value=''>Select Day</option>
                    <option value='1'>Monday</option>
                    <option value='2'>Tuesday</option>
                    <option value='3'>Wednesday</option>
                    <option value='4'>Thursday</option>
                    <option value='5'>Friday</option>
                    <option value='6'>Saturday</option>
                  </select>
                </div>
              </div>
              <div className='d-flex my-4'>
                <div className='form-group w-50'>
                  <label htmlFor='subject'>Subject</label>
                  <input
                    type='text'
                    className='form-control'
                    id='subject'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className='form-group w-50 ms-4'>
                  <label htmlFor='teacher'>Teacher</label>
                  <input
                    type='text'
                    className='form-control'
                    id='teacher'
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                </div>
              </div>
              <div className='d-flex'>
                <div className='form-group w-50 '>
                  <label htmlFor='startTime'>Start Time</label>
                  <input
                    type='time'
                    className='form-control'
                    id='startTime'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className='form-group w-50 ms-4'>
                  <label htmlFor='endTime'>End Time</label>
                  <input
                    type='time'
                    className='form-control'
                    id='endTime'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className='text-center'>
                <button type='submit' className='btn btn-primary mt-3'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <UpdateDelete />
        <NavLink to="/classes">
          <button type="button" className="btn btn-light btn-lg plus-button check-button">
            <i className="fa-solid fa-check plus-icon "></i></button>
        </NavLink >
        <ToastContainer />
      </div>
    </>
  );
};

export default AddOngoing;      

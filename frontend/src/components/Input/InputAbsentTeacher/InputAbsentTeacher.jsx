import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import InputNavbar from '../InputNavbar/InputNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import DeleteTeacher from './DeleteTeacher'
import {BASE_URL} from '../../../../services/url'

const InputAbsentTeacher = () => {
    // Initialize states
    const [name, setName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const isAdmin = localStorage.getItem('is_admin');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // Send data to server for saving
        await axios.post(`${BASE_URL}/absent/teacher`, { name, fromDate, toDate });
        // Show success message to user
        toast.success('Data saved successfully');
        // Send delete request to server to clear input fields
        await axios.delete(`${BASE_URL}/absent/teacher`);
    } catch (err) {
        // Show error message to user if all fields are not filled
        toast.error('All fields required');
    }
    };

    return (
        <>
            {/* Render InputNavbar component only if user is admin */}
            {isAdmin === 'true' && <InputNavbar />}
            <div className='container'>
                <h1>Absent Teacher</h1>
                <form className="input text-center" onSubmit={handleSubmit}>
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
                    
                        <div className="input-group mb-3 me-3 ">
                            <span className="input-group-text">From</span>
                            <input
                                type="date"
                                name="fromDate"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="input-group mb-3 ">
                            <span className="input-group-text">To</span>
                            <input
                                type="date"
                                name="toDate"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
            </div>
            {/* Render DeleteTeacher and Check button only if user is admin */}
            {isAdmin === 'true' && <>
                <DeleteTeacher />
                <NavLink to="/teachers">
                    <button type="button" className="btn btn-light btn-lg plus-button check-button">
                        <i className="fa-solid fa-check plus-icon "></i>
                    </button>
                </NavLink>
            </>
            }
            <ToastContainer />
        </>
    )
}

export default InputAbsentTeacher;

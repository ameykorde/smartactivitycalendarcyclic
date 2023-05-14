import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InputNavbar from '../InputNavbar/InputNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function InputAdmin() {
    const [users, setUsers] = useState([]);

    // Get all users from database on component mount
    useEffect(() => {
        getUsers();
    }, []);

    // Retrieve users from database
    const getUsers = async () => {
        try {
            const response = await axios.get(`/getUser`);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Toggle admin status of user in database
    const toggleAdmin = async (id, isAdmin) => {
        try {
            await axios.patch(`/updateUser/${id}`, { is_admin: !isAdmin });
            await getUsers();
            toast.success('User admin status updated!');
        } catch (error) {
            console.error(error);
            toast.error('Error updating user admin status.');
        }
    };

    // Delete user from database
    const deleteUser = async (id) => {
        try {
            await axios.delete(`/deleteUser/${id}`);
            await getUsers();
            toast.success('User deleted.');
        } catch (error) {
            console.error(error);
            toast.error('Error deleting user.');
        }
    };

    return (
        <>
            <InputNavbar />
            <div className="container">
                <h1>Admin Controller</h1>
                <table className="table table-striped mt-3 text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map over all users in the database and display their information */}
                        {users.map((user) => (
                            <tr key={user._id} style={{fontSize:"1.2rem"}}>
                                <td>{user.name}</td>
                                {/* Checkbox to toggle admin status of user */}
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={user.is_admin}
                                        onChange={() => toggleAdmin(user._id, user.is_admin)}
                                        style={{ 
                                            width: "20px", 
                                            height: "20px",
                                            marginTop:"1.1%"
                                         }}
                                    />
                                </td>
                                {/* Button to delete user */}
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <NavLink to="/">
                <button type="button" className="btn btn-light btn-lg plus-button check-button">
                    <i className="fa-solid fa-check plus-icon"></i>
                </button>
            </NavLink>
            {/* Toast messages for success and error */}
            <ToastContainer />
        </>
    );
}

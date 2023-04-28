import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import {BASE_URL} from '../../../../services/url'

const ViewOngoing = () => {
    const navigate = useNavigate(); // Allows navigation to other pages
    const [ongoingData, setOngoingData] = useState([]); // State variable to store the ongoing data
    const [editId, setEditId] = useState(''); // State variable to store the ID of the data being edited
    const [updateData, setUpdateData] = useState({ // State variable to store the updated data
        semester: '',
        section: '',
        day: '',
        subject: '',
        teacher: '',
        startTime: '',
        endTime: '',
    });

    // Function to get the name of the day based on the given number
    const getDayName = (day) => {
        switch (day) {
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            default:
                return '';
        }
    };

    // Handle edit button click
    const handleEdit = (id) => {
        setEditId(id);
        setUpdateData(ongoingData.find((data) => data._id === id));
    };

    // Handle input change in edit mode
    const handleInputChange = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle deletion of a single data item
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/ongoing/deleteClass/${id}`);
            toast.success('Data Deleted Successfully');
            setOngoingData(ongoingData.filter((data) => data._id !== id));
        } catch (error) {
            toast.error('Connection Error');
        }
    };

    // Handle deletion of all data
    const handleDeleteAll = async () => {
        if (window.confirm('Are you sure you want to delete all data?')) {
            try {
                await axios.delete(`${BASE_URL}/ongoing/deleteAllClass`);
                toast.success('All Data Deleted Successfully');
            } catch (error) {
                toast.error('Connection Error');
            }
        }
    };

    // Handle cancel button click
    const handleCancel = () => {
        setEditId('');
        setUpdateData({
            semester: '',
            section: '',
            day: '',
            subject: '',
            teacher: '',
            startTime: '',
            endTime: ''
        });
    };

    // Handle updating of data
    const handleUpdate = async (id) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/ongoing/updateOngoingClass/${id}`,
                {
                    semester: updateData.semester,
                    section: updateData.section,
                    day: updateData.day,
                    subject: updateData.subject,
                    teacher: updateData.teacher,
                    startTime: updateData.startTime,
                    endTime: updateData.endTime,
                }
            );
            toast.success('Data Updated Successfully');
            setOngoingData(
                ongoingData.map((data) => {
                    if (data._id === id) {
                        return {
                            ...data,
                            ...response.data
                        }
                    }
                    return data;
                })
            );
        } catch (error) {
            toast.error('Error in Updating Data');
        }

        // Reset editId and updatedData states
        setEditId('');
        setUpdateData({
            semester: '',
            section: '',
            day: '',
            subject: '',
            teacher: '',
            startTime: '',
            endTime: '',
        })
    };

    useEffect(() => {
        //fetch data when page loads
        const fetchData = async () => {
            try {
                const response = await axios.get(
                        `${BASE_URL}/ongoing/allData`
                );
                setOngoingData(response.data);
            } catch (error) {
                toast.error('Unable to Fetch Data');
            }
        };
        if (!localStorage.getItem("user")) {
            navigate('/login')
        } else {
            fetchData()
        }
    }, []);

    return (
        <div className='container'>
            <h1 className='my-4'>Classes</h1>
            <div className='table-responsive'>
                <table className='table table-striped input-classes-table' >
                    <thead>
                        <tr>
                            <th scope='col'>Semester</th>
                            <th scope='col'>Section</th>
                            <th scope='col'>Day</th>
                            <th scope='col'>Subject</th>
                            <th scope='col'>Teacher</th>
                            <th scope='col'>Start Time</th>
                            <th scope='col'>End Time</th>
                            <th scope="col">
                                <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteAll}>Delete All</button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            ongoingData.map((data) => (
                                // For each data object, a table row is created with a unique key based on its _id
                                <tr key={data._id}>
                                    {/* If editId is equal to the current data object's _id, render the row with input fields and buttons for editing */}
                                    {editId === data._id ? (
                                        <>
                                            <td>
                                                <select
                                                    className='form-control'
                                                    id='semester'
                                                    name='semester'
                                                    value={updateData.semester}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value=''>Select Semester</option>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                    <option value='6'>6</option>
                                                    <option value='7'>7</option>
                                                    <option value='8'>8</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    className='form-control'
                                                    id='section'
                                                    name='section'
                                                    value={updateData.section}
                                                    onChange={handleInputChange}>
                                                    <option value=''>Select Section</option>
                                                    <option value='A'>A</option>
                                                    <option value='B'>B</option>
                                                    <option value='C'>C</option>
                                                    <option value='D'>D</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    className='form-control'
                                                    id='day'
                                                    name='day'
                                                    value={updateData.day}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value=''>Select Day</option>
                                                    <option value='1'>Monday</option>
                                                    <option value='2'>Tuesday</option>
                                                    <option value='3'>Wednesday</option>
                                                    <option value='4'>Thursday</option>
                                                    <option value='5'>Friday</option>
                                                    <option value='6'>Saturday</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    id='subject'
                                                    name='subject'
                                                    value={updateData.subject}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    id='teacher'
                                                    name='teacher'
                                                    value={updateData.teacher}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type='time'
                                                    className='form-control'
                                                    id='startTime'
                                                    name='startTime'
                                                    value={updateData.startTime}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type='time'
                                                    className='form-control'
                                                    id='endTime'
                                                    name='endTime'
                                                    value={updateData.endTime}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <button onClick={() => handleUpdate(data._id)} className="btn btn-success btn-sm ms-2">Save</button>
                                                <button onClick={handleCancel} className="btn btn-secondary ms-2 btn-sm mt-2">Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{data.semester}</td>
                                            <td>{data.section}</td>
                                            <td>{getDayName(data.day)}</td>
                                            <td>{data.subject}</td>
                                            <td>{data.teacher}</td>
                                            <td>{moment(data.startTime, 'HH:mm').format('h:mm A')}</td>
                                            <td>{moment(data.endTime, 'HH:mm').format('h:mm A')}</td>

                                            <td>
                                                <button
                                                    className='btn btn-danger btn-sm '
                                                    onClick={() => handleDelete(data._id)}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className='btn btn-info btn-sm mx-2 '
                                                    onClick={() => handleEdit(data._id)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ViewOngoing;

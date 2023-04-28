import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './InputNotice.css';
import {BASE_URL} from '../../../../services/url'

function NoticeContent(props) {

    // State for tracking whether the component is in edit mode or not
    const [isEditing, setIsEditing] = useState(false);

    // State for storing the original notice data
    const [originalData, setOriginalData] = useState({
        title: props.title,
        content: props.content,
        date: moment(props.date).format('YYYY-MM-DD'),
        time: props.time
    });

    // Function to delete the notice
    const deleteNotice = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/notice/delete-notice/${id}`);
            toast.success("Deleted Successfully");
        } catch (error) {
            toast.error("Something Went Wrong");
        }
    }

    // Function to enable edit mode
    const handleEdit = () => {
        setIsEditing(true);
    }

    // Function to cancel the changes made in edit mode
    const handleCancel = () => {
        setIsEditing(false);
        setOriginalData({
            title: props.title,
            content: props.content,
            date: moment(props.date).format('YYYY-MM-DD'),
            time: props.time
        });
    }

    // Function to save the changes made in edit mode
    const handleSave = async () => {
        try {
            // Send updated data to the server using axios
            await axios.put(`${BASE_URL}/notice/update-notice/${props.id}`, originalData);
            setIsEditing(false);
            toast.success("Saved Successfully");
        } catch (error) {
            toast.error("Something Went Wrong");
        }
    }

    // Function to handle input change in edit mode
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setOriginalData(prevState => ({ ...prevState, [name]: value }));
    }

    // Variables to display the date and time in proper format
    let displayDate = "";
    let displayTime = "";

    if (originalData.date === 'Invalid date' || originalData.date === "") {
        originalData.date = "";
    } else {
        displayDate = moment(originalData.date).format('dddd, Do MMMM');
    }
    if (originalData.time === 'Invalid time' || originalData.time === "") {
        originalData.time = "";
    } else {
        displayTime = moment(originalData.time, 'HH:mm').format('hh:mm A');
    }


    return (
        <div className="edit-notice-card ">

            <div className="input-notice-content ">
                {isEditing ? (
                    // if isEditing is true render this
                    <>
                        <div className="input-notice-date ">
                            <input
                                name="date"
                                type="date"
                                placeholder="date"
                                value={originalData.date}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                            <input
                                name="time"
                                type="time"
                                value={originalData.time}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="input-group mb-3 my-3">
                            <input
                                name="title"
                                type="text"
                                className="form-control"
                                style={{ width: "70%" }}
                                value={originalData.title}
                                onChange={handleInputChange}
                                placeholder='Enter Heading'
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="content"
                                type="input"
                                className="form-control"
                                value={originalData.content}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder='Enter Content'
                            ></textarea>
                        </div>

                    </>
                ) : (
                    // if isEditing is false render this
                    <>
                        <div className="notice-time">
                            <h5>{displayDate} </h5>
                            <h5>{displayTime}</h5>
                        </div>
                        <h3>{props.title}</h3>
                        <h5 style={{ whiteSpace: "pre-wrap" }}>{props.content}</h5>
                    </>
                )}
            </div>
            {isEditing ? (
                // if isEditing is true render this
                <>
                    <button className="btn btn-primary mt-1" onClick={handleSave}>Save</button>
                    <button className="btn btn-danger ms-3 mt-1" onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                // if isEditing is false render this
                <>
                    <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                    <button className="btn btn-primary btn-danger ms-3" onClick={() => { deleteNotice(props.id) }}>Delete</button>
                </>
            )}
            <ToastContainer />
        </div>
    )
}

export default NoticeContent;

import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputNavbar from '../InputNavbar/InputNavbar';
import './InputNotice.css';
import NoticeContent from "./NoticeContent";
import {BASE_URL} from '../../../../services/url'

function Input() {
  const navigate = useNavigate();

  // State to store the data retrieved from the server
  const [data, setData] = useState([]);

  // State to store the notice input data
  const [notice, setNotice] = useState({
    date: "",
    time: "",
    title: "",
    content: ""
  });

  // Handler function to update notice state on input changes
  const handleInput = e => {
    const { name, value } = e.target;
    setNotice({ ...notice, [name]: value });
  };

  // Function to send a POST request to add a new notice to the server
  const postNotice = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request with the notice data to the server
      const res = await axios.post(`${BASE_URL}/notice/newNotice`, notice);

      if (res.data.message) {
        toast.success(res.data.message);
        // Clear the notice input data after successful addition
        setNotice({ date: "", time: "", title: "", content: "" });
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }

    try {
      // Send a DELETE request to delete all notices from the server whose date is less than current date
      await axios.delete(`${BASE_URL}/notice/deleteNotice`);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect hook to retrieve data from the server on component mount or data update
  useEffect(() => {
    const getNotice = async () => {
      try {
        // Send a GET request to retrieve notice data from the server
        const res = await axios.get(`${BASE_URL}/notice/noticeData`);
        // Update the state with the retrieved data
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (!localStorage.getItem("user")) {
      // Redirect to the login page if the user is not authenticated
      navigate('/login');
    } else {
      // Retrieve the notice data from the server
      getNotice();
    }
  }, [data]);


  return (
    <>
      <InputNavbar />
      <div className='container'>
        <h1> Enter Notice</h1>
        <div className="row justify-content-center">
          <div className="input-notice-card">
            <div className="input-notice-date ">
              <h5 className="ms-3 mt-2 me-3">Date:</h5>
              <input
                name="date"
                type="date"
                placeholder="date"
                value={notice.date}
                onChange={handleInput}
                className="form-control"
              />
              <h5 className="ms-3 mt-2 me-3">Time:</h5>
              <input
                name="time"
                type="time"
                value={notice.time}
                onChange={handleInput}
                className="form-control"
              />
            </div>

            <div className="input-group mb-3 my-3">
              <span className="input-group-text col-xs-4">
                <h5>Title</h5>
              </span>
              <input
                name="title"
                type="text"
                className="form-control"
                style={{ width: "70%" }}
                value={notice.title}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Add Content</label>
              <textarea
                name="content"
                type="input"
                className="form-control"
                value={notice.content}
                onChange={handleInput}
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary my-3 ms-2"
              onClick={postNotice}
            >
              Add Notice
            </button>
          </div>

          {
            data.map(item => {
              return <NoticeContent
                id={item._id}
                key={item._id}
                title={item.title}
                content={item.content}
                time={item.time}
                date={item.date}
              />
            })
          }
        </div>

        <NavLink to="/">
          <button type="button" className="btn btn-light btn-lg plus-button check-button">
            <i className="fa-solid fa-check plus-icon "></i></button>
        </NavLink >

      </div>
      <ToastContainer />
    </>
  )
}

export default Input

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import InputNavbar from '../InputNavbar/InputNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function InputTT() {
  const navigate = useNavigate();
  const [semester, setSemester] = useState('');
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);

  // Fetching data from the server using an effect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/timetable/get`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!localStorage.getItem("user")) {
      navigate('/login')
    } else {
      fetchData()
    }
  }, []);

  // Function to handle file selection for image upload
  const handleFileSelect = (event) => {
    setImages(event.target.files);
  };

  // Function to handle form submission on image upload
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('semester', semester);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await axios.post(`/timetable/post`, formData);
      toast.success("Time-Table Added Successfully")
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle deletion of a semester
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/timetable/delete/${id}`);
      setData((prevSemesters) => prevSemesters.filter((semester) => semester._id !== id)); //update the data by removing deleted data
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <InputNavbar />
      <div className='container'>
        <h1>TIME TABLE</h1>
        <form className='input' onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='input-group mb-3 me-3'>
            <span className='input-group-text'>Semester</span>
            <input type='text' name='semester' onChange={(e) => setSemester(e.target.value)} className='form-control' />
          </div>
          <div className='input-group mb-3 tt-upload'>
            <input type='file' name='images' multiple onChange={handleFileSelect} className='form-control' />
          </div>
          <button type='submit' className='btn btn-primary'>
            Upload
          </button>
        </form>

        <h2 className="text-center my-3">Semesters:</h2>
        <ul className="list-group mx-auto w-75">
          {data.map((semester) => (
            <li key={semester._id} className="list-group-item d-flex justify-content-between align-items-center">
              {semester.semester}
              <button onClick={() => handleDelete(semester._id)} type='button' className='btn btn-danger'>
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>

      <NavLink to='/timetable'>
        <button type='button' className='btn btn-light btn-lg plus-button check-button'>
          <i className='fa-solid fa-check plus-icon '></i>
        </button>
      </NavLink>
      <ToastContainer />
    </>
  );
}

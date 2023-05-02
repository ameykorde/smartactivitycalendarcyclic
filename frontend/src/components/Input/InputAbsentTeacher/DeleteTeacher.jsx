// This component displays a table of absent teachers and provides functionality to delete each entry.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // for formatting dates
import { ToastContainer, toast } from 'react-toastify'; // for displaying success/error messages
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from '../../../../services/url'

const DeleteTeacher = () => {
  const [absentTeachers, setAbsentTeachers] = useState([]);

  // fetch absent teachers data from server on component mount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${BASE_URL}/absent/teacher/get`);
      setAbsentTeachers(result.data);
    };
    fetchData();
  }, []);

  // function to delete a teacher from the table and server
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/absent/teacher/${id}`);
      setAbsentTeachers(absentTeachers.filter((teacher) => teacher._id !== id));
      toast.success('Data deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete data');
    }
  };

  // render absent teachers table
  return (
    <>
      <div className='container '>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {absentTeachers.map((teacher) => (
              <tr key={teacher._id} style={{fontSize:"1.2rem"}}>
                <td>{teacher.name}</td>
                <td>{moment(teacher.fromDate).format('dddd, Do MMMM')}</td>
                <td>{moment(teacher.toDate).format('dddd, Do MMMM')}</td>
                <td>
                  <button type='button' className='btn btn-danger' onClick={() => handleDelete(teacher._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer /> {/*display success/error messages in a toast container */}
    </>
  );
};

export default DeleteTeacher;
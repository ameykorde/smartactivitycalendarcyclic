import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from '../../../../services/url'

function UpdateDelete() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [editId, setEditId] = useState('');
  const [updatedData, setUpdatedData] = useState({
    name: '',
    email: '',
    file: null
  });

  // Handle edit button click
  const handleEdit = (id) => {
    setEditId(id); // sets the editId state to the provided id.
    setUpdatedData(teachers.find((teacher) => teacher._id === id)); 
    /* finds the teacher object in the teachers array whose _id property matches the provided id
    and sets the updatedData state to that teacher object. */
  };

  // Handle input change in edit mode
  const handleInputChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input change in edit mode
  const handleFileChange = (e) => {
    setUpdatedData({
      ...updatedData,
      file: e.target.files[0],
    });
  };

  // Handle cancel button click
  const handleCancel = () => {
    setEditId('');
    setUpdatedData({
      name: '',
      email: '',
      file: null,
    });
  };

  // Handle save button click
  const handleSave = async (id) => {
    // Create form data with updated data
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('email', updatedData.email);
    formData.append('file', updatedData.file);

    try {
      // Send PATCH request to update teacher with updated data
      const response = await axios.patch(`${BASE_URL}/teacher/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update teachers state with updated teacher
      setTeachers(
        teachers.map((teacher) => {
          if (teacher._id === id) {
            return {
              ...teacher,
              ...response.data,
            };
          }
          return teacher;
        })
      );

      // Show success message
      toast.success('Data updated successfully!');
    } catch (error) {
      // Show error message
      toast.error('Failed to update data!');
      console.error(error);
    }

    // Reset editId and updatedData states
    setEditId('');
    setUpdatedData({
      name: '',
      email: '',
      file: null,
    });
  };

  useEffect(() => {
    async function fetchTeachers() {
      try {
        // Send GET request to fetch teachers
        const response = await axios.get(`${BASE_URL}/teacher/get`);

        // Update teachers state with fetched teachers
        setTeachers(response.data);
      } catch (error) {
        // Show error message
        toast.error('Failed to fetch teachers!');
        console.error(error);
      }
    }
    if (!localStorage.getItem("user")) {
      navigate('/login')
    } else {
      fetchTeachers()
    }
  }, []);

  // Handle delete button click
  const handleDelete = async (teacherId) => {
    try {
      // Send DELETE request to delete teacher
      const response = await axios.delete(`${BASE_URL}/teacher/delete/${teacherId}`);
      console.log(response.data);

      // Update teachers state with remaining teachers
      setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));

      toast.success('Timetable deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete Timetable!');
      console.error(error);
    }
  };


  return (
    <div className="container text-center table-responsive">
      <h2 className="mt-5 mb-3">Edit Time Table</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>TimeTable</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the 'teachers' array and rendering a table row for each teacher */}
          {teachers.map((teacher) => (
            // Setting a unique 'key' prop for each row, using the teacher's ID
            <tr key={teacher._id} style={{fontSize:"1.2rem"}}>
              {/* Conditionally rendering either the teacher's data or an edit form */}
              {editId === teacher._id ? (
                // If the 'editId' state matches the current teacher's ID, render an edit form
                <>
                  <td>
                    <input type="text" name="name" value={updatedData.name} onChange={handleInputChange} className="form-control" />
                  </td>
                  <td>
                    <input type="email" name="email" value={updatedData.email} onChange={handleInputChange} className="form-control" />
                  </td>
                  <td>
                    <input type="file" name="file" onChange={handleFileChange} className="form-control" />
                  </td>
                  <td>
                    <button onClick={() => handleSave(teacher._id)} className="btn btn-success">Save</button>
                    <button onClick={handleCancel} className="btn btn-secondary ms-2">Cancel</button>
                  </td>
                </>
              ) : (
                 // If the 'editId' state does not match the current teacher's ID, render the teacher's data
                <>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td><img src={`${BASE_URL}/uploads/${teacher.file}`} alt="timetable" width="50" height="50" /></td>
                  <td>
                    <button onClick={() => handleEdit(teacher._id)} className="btn btn-primary me-2">Edit</button>
                    <button onClick={() => handleDelete(teacher._id)} className="btn btn-danger">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );


}

export default UpdateDelete;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateDelete() {
  const [calendars, setCalendars] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCalendars() {
      try {
        // Send GET request to fetch calendars
        const response = await axios.get(`/calendar/get`);

        // Update calendars state with fetched calendars
        setCalendars(response.data);
      } catch (error) {
        // Show error message
        toast.error('Failed to fetch calendars!');
        console.error(error);
      }
    }
    // Check if user is logged in, if not redirect to login page, else fetch calendars
    if (!localStorage.getItem("user")) {
      navigate('/login')
    } else {
      fetchCalendars()
    }
  }, []);

  // Handle delete button click
  const handleDelete = async (calendarId) => {
    try {
      // Send DELETE request to delete calendar
      const response = await axios.delete(`/calendar/delete/${calendarId}`);
      console.log(response.data);

      // Update calendars state with remaining calendars
      setCalendars(calendars.filter((calendar) => calendar._id !== calendarId));

      // Show success message
      toast.success('Calendar deleted successfully!');
    } catch (error) {
      // Show error message
      toast.error('Failed to delete calendar!');
      console.error(error);
    }
  };

  return (
    <div className="container text-center">
      <h2 className="mt-5 mb-3">Delete Academic Calendar</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Calendar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {calendars.map((calendar) => (
            <tr key={calendar._id} style={{fontSize:"1.2rem"}}>
              <td>{calendar.name}</td>
              <td>
                <img src={`/uploads/${calendar.file}`} alt="timetable" width="50" height="50" />
              </td>
              <td>
                <button onClick={() => handleDelete(calendar._id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default UpdateDelete;

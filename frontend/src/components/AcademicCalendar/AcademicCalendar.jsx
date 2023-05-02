// import necessary modules
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../../services/url'

// import components
import Navbar from '../Navbar/Nav';

// import CSS
import './AcademicCalendar.css';

function AcademicCalendar() {
  // set initial states
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('is_admin');

  useEffect(() => {
    // fetch calendar data from backend
    const fetchCalendars = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/calendar/get`);
        setCalendars(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    // check if user is logged in
    if (!localStorage.getItem("user")) {
      navigate('/login')
    } else {
      fetchCalendars();
    }
  }, []);

  const handleCalendarSelect = (calendarName) => {
    setSelectedCalendar(calendarName);
  };

  // render the component
  return (
    <>
      <Navbar />
      <div className="container academic-calendar">
        <h1>Academic Calendar</h1>
        <div className="d-flex justify-content-center flex-wrap mb-3">
          {calendars.map(({ name, _id }) => (
            // render calendar buttons
            <button
              key={_id}
              type="button"
              className="btn btn-lg btn-outline-primary calendar-button mx-5 fs-4 fw-medium" 
              onClick={() => handleCalendarSelect(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="grid">
          {calendars
            // filter and render the selected calendar
            .filter(({ name }) => name === selectedCalendar)
            .map(({ _id, file }) => (
              <div key={_id} className="grid__item">
                <img className="img-fluid" src={`${BASE_URL}/uploads/${file}`} alt="grid_image" />
              </div>
            ))}
        </div>
        {/* render "plus" button for admin users */}
        {isAdmin === 'true' &&
          <NavLink to="/input/academiccalendar">
            <button type="button" className="btn btn-light btn-lg plus-button"><i className="fa-solid fa-plus plus-icon "></i></button>
          </NavLink>
        }
      </div>
    </>
  );
}

export default AcademicCalendar;
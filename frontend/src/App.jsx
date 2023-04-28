import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Notice from './components/Notice/Notice';
import Classes from './components/Classes/Classes';
import Teachers from './components/Teachers/Teachers';
import TimeTable from './components/TimeTable/TimeTable';
import AcademicCalendar from './components/AcademicCalendar/AcademicCalendar';
import Todo from './components/Todo/Todo';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Input from './components/Input/InputNotice/InputNotice';
import InputClasses from './components/Input/InputClasses/InputClasses';
import InputTeachers from './components/Input/InputTeachers/InputTeachers';
import InputTimeTable from './components/Input/InputTT/InputTT';
import InputAcademicCalendar from './components/Input/InputAC/InputAC';
import InputAbsentTeacher from './components/Input/InputAbsentTeacher/InputAbsentTeacher';
import InputAdmin from './components/Input/InputAdmin/InputAdmin'
import Admin from './components/Admin';
import NoticeAlert from './components/Notice/NoticeAlert.jsx';

function App() {

  // Add an axios interceptor to attach the token to each request
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('user');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return (
    <>
      <NoticeAlert/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notice />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="/academiccalendar" element={<AcademicCalendar />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/input/absent" element={<InputAbsentTeacher />} />

          <Route path="/input" element={<Admin Component={Input} />} />
          <Route path="/input/classes" element={<Admin Component={InputClasses} />} />
          <Route path="/input/teachers" element={<Admin Component={InputTeachers} />} />
          <Route path="/input/timetable" element={<Admin Component={InputTimeTable} />} />
          <Route path="/input/academiccalendar" element={<Admin Component={InputAcademicCalendar} />} />
          <Route path="/input/admin" element={<Admin Component={InputAdmin} />} />
          
          <Route path="/*" element={<Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

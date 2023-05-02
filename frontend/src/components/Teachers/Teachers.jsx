import React, { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Nav";
import axios from "axios";
import './Teachers.css'
import moment from 'moment'
import {BASE_URL} from '../../../services/url'

export default function Teachers() {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('is_admin');
    const [data, setData] = useState([]);
    const [absentTeachers, setAbsentTeachers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // Call the fetchData function when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all teachers timetable
                const response = await axios.get(`${BASE_URL}/teacher/get`);
                setData(response.data);
    
                // Fetch all the absent teachers
                const result = await axios.get(`${BASE_URL}/absent/teacher/get`);
                setAbsentTeachers(result.data);
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
    
    const handleSearch = (event) => {
        const searchQuery = event.target.value;
        const filteredArray = data.filter((teacher) => {
            const itemName = teacher.name.toLowerCase();
            return itemName.includes(searchQuery.toLowerCase());
        });
        setFilteredData(filteredArray);
    };
    
    // Set the data to be displayed based on whether the data has been filtered
    const displayData = filteredData.length > 0 ? filteredData : data;
    
    return (
        <>
            <Navbar handleSearch={handleSearch}/>
            <div className="container teachers">
                <h1>Teachers</h1>
                <div className="mb-5 main-div text-center justify-content-between">
                    <div className="teachers-table" >
                        <h2 className="teacher-table-heading ">Timetable</h2>
                        {displayData.map((teacher) => (
                            <div key={teacher._id} className="timetable-row">
                                <button type="button" className="btn btn-primary-outline btn-lg overflow-hidden" data-bs-toggle="modal" data-bs-target={`#exampleModal${teacher._id}`}>
                                    <h5>{teacher.name}</h5>
                                </button>
                                <a href={`mailto:${teacher.email}`}>
                                    <i className="fas fa-envelope fa-2xl pe-4 pt-4"></i>
                                </a>
                                <div className="modal fade" id={`exampleModal${teacher._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${teacher._id}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <img src={`${BASE_URL}/uploads/${teacher.file}`} alt={teacher.name} width="100%" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="teachers-table">
                        <h2 className="teacher-table-heading">Absent Teacher</h2>
                        {absentTeachers.map((absentTeacher) => (
                            <div key={absentTeacher._id} className="absent-teacher-row">
                                <div className="overflow-hidden">
                                    <h5>{absentTeacher.name}</h5>
                                    <p>{moment(absentTeacher.fromDate).format("MMMM Do, YYYY")} - {moment(absentTeacher.toDate).format("MMMM Do, YYYY")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {isAdmin === 'true' &&
                    <NavLink to="/input/teachers">
                        <button type="button" className="btn btn-light btn-lg plus-button"><i className="fa-solid fa-plus plus-icon "></i></button>
                    </NavLink>
                }
            </div>
        </>
    );
}

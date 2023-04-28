import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../Navbar/Nav";
import './Notice.css'
import NoticeContent from "./NoticeContent";

export default function Notice() {
    // Set up state variables
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('is_admin');

    // Fetch data from server when the component is mounted
    useEffect(() => {
        const getNotice = async () => {
            try {
                const res = await axios.get(`/notice/noticeData`);
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        // Redirect to login page if the user is not logged in
        if (!localStorage.getItem("user")) {
            navigate('/login');
        } else {
            getNotice();
        }
    }, [data]);

    // Filter data based on search query
    const handleSearch = (event) => {
        const searchQuery = event.target.value;
        const filteredArray = data.filter((item) => {
            const itemTitle = item.title.toLowerCase();
            const itemContent = item.content.toLowerCase();
            return itemTitle.includes(searchQuery.toLowerCase()) || itemContent.includes(searchQuery.toLowerCase());
        });
        setFilteredData(filteredArray);
    };

    // Display filtered data if search query exists, else display all data
    const displayData = filteredData.length > 0 ? filteredData : data;

    return (
        <>
            <Navbar handleSearch={handleSearch} />
            <div className="container notice">
                <h1>NOTICES</h1>
                <div className="row justify-content-center">
                    {displayData.map((item) => {
                        // Render NoticeContent component for each notice item
                        return (
                            <NoticeContent
                                key={item._id}
                                title={item.title}
                                content={item.content}
                                time={item.time}
                                date={item.date}
                            />
                        );
                    })}
                </div>
                {/* Display add notice button if user is an admin */}
                {isAdmin === 'true' && (
                    <NavLink to="/input/">
                        <button type="button" className="btn btn-light btn-lg plus-button">
                            <i className="fa-solid fa-plus plus-icon "></i>
                        </button>
                    </NavLink>
                )}
            </div>
        </>
    );
}

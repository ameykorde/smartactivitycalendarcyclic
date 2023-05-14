import { useEffect, useState } from "react"
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Nav";
import './TimeTable.css'

export default function TimeTable() {

    const [data, setData] = useState([]);
    const isAdmin = localStorage.getItem('is_admin');
    const navigate = useNavigate();

    useEffect(() => {
        // function to fetches the timetable data
        async function fetchData() {
            try {
                const response = await axios.get(`/timetable/get`);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        // Check if the user is logged in, and fetch the data if they are
        if (!localStorage.getItem("user")) {
            navigate('/login')
        } else {
            fetchData()
        }
    }, []); //empty array means data will fetch once onloading

    return (
        <>
            <Navbar />

            <div className="container time-table">
                <h1>Time Table</h1>
                <div className="row justify-content-center">
                    {data.map((item) => (
                        <div key={item._id}>
                            <h2 className="text-center mb-3">{item.semester}</h2>
                            <div className="row justify-content-center">
                                {item.images.map((image, index) => (
                                    <div key={`image-${index}`} className="col-md-3 mx-4">
                                        <div
                                            className="timetable-card mb-4"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#exampleModal${index + 1}`}
                                            data-image={image}
                                            type="button"
                                        >
                                            <h4>{`Section ${index + 1}`}</h4>
                                        </div>
                                        <div
                                            className="modal fade"
                                            id={`exampleModal${index + 1}`}
                                            tabIndex="-1"
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <img
                                                            className="img-fluid"
                                                            src={`/uploads/${image.filename}`}
                                                            alt="Image"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {isAdmin === 'true' && (
                    // Use parentheses to wrap the JSX expression that contains the button
                    <NavLink to="/input/timetable">
                        <button type="button" className="btn btn-light btn-lg plus-button"><i className="fa-solid fa-plus plus-icon"></i></button>
                    </NavLink>
                )}
            </div>
        </>
    );
}

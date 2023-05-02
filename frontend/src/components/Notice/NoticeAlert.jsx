import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../services/url'
import 'moment-timezone';

function NoticeAlert() {
    moment.tz.setDefault('Asia/Kolkata');  //setting default timezone to Indian Timezone
    const [notices, setNotices] = useState([]);

    // Fetch notice data from server on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${BASE_URL}/notice/noticeData`);
                // Filter notices to only show those for the current day
                const filteredNotices = result.data.filter((notice) => {
                    return moment(notice.date).isSame(moment(), 'day');
                });
                setNotices(filteredNotices);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchData();
    }, []);
    
    
    // Fetch notice data from server on component mount if user logged in
    if (localStorage.getItem("user")) {
        useEffect(() => {
            const interval = setInterval(() => {
                if (
                    moment().format('HH:mm') === '07:00' ||
                    moment().format('HH:mm') === '08:00' ||
                    moment().format('HH:mm') === '09:00' ||
                    moment().format('HH:mm') === '10:00' ||
                    moment().format('HH:mm') === '11:00' ||
                    moment().format('HH:mm') === '12:00' ||
                    moment().format('HH:mm') === '13:00' ||
                    moment().format('HH:mm') === '14:00' ||
                    moment().format('HH:mm') === '15:00' ||
                    moment().format('HH:mm') === '16:00' ||
                    moment().format('HH:mm') === '17:00' ||
                    moment().format('HH:mm') === '18:00' ||
                    moment().format('HH:mm') === '19:00' ||
                    moment().format('HH:mm') === '20:00' ||
                    moment().format('HH:mm') === '21:00'
                    ) {
                        if (notices.length > 0) {
                        notices.forEach((notice) => {
                        // Convert time to a display format
                        let displayTime = moment(notice.time, 'HH:mm').format('hh:mm A');
                        // If the time is invalid, set displayTime to an empty string
                        if (displayTime === 'Invalid date') {
                            displayTime = '';
                        }
                            toast(` ${notice.title} is scheduled at ${displayTime}`, { position: 'top-right', autoClose: 15000 });
                        });
                    }
                }
            }, 60000); // 1 minute in milliseconds to run these function every minute
            // Clear interval on component unmount
            return () => clearInterval(interval);
        }, [notices]);
    }

    return (
        <>
            <ToastContainer />
        </>
    );
}

export default NoticeAlert;

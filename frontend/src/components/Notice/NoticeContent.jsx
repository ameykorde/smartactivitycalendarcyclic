import React from 'react';
import './Notice.css';
import moment from 'moment';

function NoticeContent({ title, content, time, date }) {

    // Convert time to a display format
    let displayTime = moment(time, 'HH:mm').format('hh:mm A');

    // If the time is invalid, set displayTime to an empty string
    if (displayTime === 'Invalid date') {
        displayTime = '';
    }
    
    // Convert the event date to a display format
    let displayDate = moment(date).format('dddd, Do MMMM');

    // If the date is invalid, set displayDate to an empty string
    if (displayDate === 'Invalid date') {
        displayDate = '';
    }

    return (
        <>
            <div className="notice-card ">
                <div className="notice-time">
                    <h5>{displayDate} </h5>
                    <h5>{displayTime}</h5>
                </div>
                <div className="notice-content ">
                    <h3>{title}</h3>
                    <h5 style={{ whiteSpace: 'pre-wrap' }}>{content}</h5> 
                </div>
            </div>
        </>
    );
}

export default NoticeContent;

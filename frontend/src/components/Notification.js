import React from 'react';
import './Notification.css';
import {CiTrash} from "react-icons/ci"; // Assuming CSS is in this file

const Notification = ({ notificationMessage, notificationData, onDelete }) => {
    return (
        <div className="notification-container">
            <div className="notification-body">
                <p style={{margin: "0.1rem", marginBottom: "0.5rem"}}><em>{notificationData}</em></p>
                {notificationMessage}
            </div>
            <div className="notification-cancel">
                <CiTrash className="icon" onClick={onDelete}/>
            </div>
        </div>
    );
}

export default Notification;

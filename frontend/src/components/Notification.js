import React from 'react';
import './Notification.css';
import {CiTrash} from "react-icons/ci"; // Assuming CSS is in this file

const Notification = ({ notificationMessage, onDelete }) => {
    return (
        <div className="notification-container">
            <div className="notification-body">
                {notificationMessage}
            </div>
            <div className="notification-cancel">
                <CiTrash className="icon" onClick={onDelete}/>
            </div>
        </div>
    );
}

export default Notification;

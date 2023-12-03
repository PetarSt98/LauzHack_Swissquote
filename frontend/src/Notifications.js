import React, {useState} from 'react';
import Notification from "./components/Notification";

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        "Notification number 1, maybe you should buy some things",
        "Notification number 1, maybe you should buy some things",
        "Yet another notification",
    ]);

    const onDelete = (index) => {
        const newNotifications = notifications.filter((_, i) => i !== index);
        setNotifications(newNotifications);
    };

    return <div>
        <h2 style={{marginBottom: "0em"}}>Notifications</h2>
        <div className="notifications-container">
            {notifications.map((message, index) => (
                <Notification
                    key={index}
                    notificationMessage={message}
                    onDelete={() => onDelete(index)}
                />
            ))}
        </div>
    </div>;
};

export default Notifications;

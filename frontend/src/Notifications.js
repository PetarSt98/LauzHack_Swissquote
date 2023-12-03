import React, {useEffect, useState} from 'react';
import Notification from "./components/Notification";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://giuseppesteduto.me:5000/notification?user_id=1`);
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setNotifications([]);
            }
        };

        fetchData();
    }, []);

    const onDelete = (index) => {
        const newNotifications = notifications.filter((_, i) => i !== index);
        setNotifications(newNotifications);
    };

    return <div>
        <h2 style={{marginBottom: "0em"}}>Notifications</h2>
        <div className="notifications-container">
            {notifications.map((not, index) => (
                <Notification
                    key={index}
                    notificationData={not.datetime}
                    notificationMessage={not.mx}
                    onDelete={() => onDelete(index)}
                />
            ))}
        </div>
    </div>;
};

export default Notifications;

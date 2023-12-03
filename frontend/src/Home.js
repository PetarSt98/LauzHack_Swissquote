import React, {useEffect} from 'react';
import { useState } from "react";
import ClockLoader from "react-spinners/ClockLoader";
import './Home.css'
import axios from "axios";
import {FaRegThumbsDown, FaRegThumbsUp} from "react-icons/fa";
import {VscRefresh} from "react-icons/vsc";
import io from 'socket.io-client';

const urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('user_id');
// If no user Id is provided, take it from the cookie
if (!userId) {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(cookie => cookie.startsWith('user_id'));
    if (cookie) {
        userId = cookie.split('=')[1];
    }
}
// Set cookie if not set
document.cookie = `user_id=${userId}`;

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const socket = io('http://localhost:5000', { transports: ['websocket'] });

    useEffect(() => {
        // Join the room for user ID 222
        socket.emit('join', '222');

        socket.on('advice', (data) => {
            // Handle the advice data
            console.log(data.result);
        });

        // Clean up on unmount
        return () => {
            socket.off('advice');
            socket.emit('leave', '222');
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'your-endpoint-url' with the actual endpoint URL
                const response = await axios.get(`http://localhost:5000/getAdvice?user_id=${userId}`);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <>
            <div className="sweet-loading">
                <ClockLoader
                    color="#fa5B35"
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            {data &&
            <>
                <h2>Based on your great profile, this is what your aissistant recommends:</h2>
                <div className="aissistant-response">
                    {data.advice}
                </div>
                <div className="rate-caption">
                    <p>Rate this answer</p>
                    <div className="rate-buttons">
                        <FaRegThumbsUp />&nbsp;&nbsp;
                        <FaRegThumbsDown />
                    </div>
                </div>
                <button className="btn-refresh" onClick={() => window.location.reload()}><VscRefresh />Refresh!</button>
            </>
            }
        </>
    );
};

export default Home;

import React, {useEffect} from 'react';
import { useState } from "react";
import ClockLoader from "react-spinners/ClockLoader";
import './Home.css'
import axios from "axios";

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'your-endpoint-url' with the actual endpoint URL
                const response = await axios.get('http://localhost:8080/example.json');
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(fetchData, 2000);
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
                    {data.message}
                </div>
            </>
            }
        </>
    );
};

export default Home;

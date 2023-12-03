import React, {useEffect, useState} from 'react';
import './News.css';
import Card from "./components/Card";
import {CiFilter} from "react-icons/ci";
import ClockLoader from "react-spinners/ClockLoader";
import "./News.css";
import axios from "axios";

const News = () => {
    const [articleData, setArticleData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Request user parameter from backend
    useEffect(() => {
        axios.get(`http://localhost:5000/news`)
            .then(res => {
                setArticleData(res.data.articles)
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return <div>
        <h2 style={{marginBottom: "0em"}}>Relevant news</h2>
        <p style={{marginTop: "0.25em"}}>Our algorithm-curated set of news that you might find interesting to guide your choices in the trading world!</p>
        <div className="sweet-loading">
            <ClockLoader
                color="#fa5B35"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
        <div className="news-card-container">
            <div className="filter-bar">
                <div className="search-box">
                    <CiFilter />
                    <input
                        type="text"
                        placeholder="Filter by tag..."
                        onChange={e => console.log(e.target.value)}
                    />
                </div>
                <input
                    type="date"
                    onChange={e => console.log(e.target.value)}
                />
            </div>
            {articleData.map(article => (
                <Card key={article.id} article={article} />
            ))}
        </div>
    </div>;
};

export default News;

import React, {useState} from 'react';
import './News.css';
import Card from "./components/Card";
import {CiFilter} from "react-icons/ci";
import "./News.css";

const News = () => {
    const [articleData, setArticleData] = useState([
        { id: 1, headline: 'Ron DeSantis is running the Iowa playbook — and hoping that’s what still counts', website: 'nbcnews.com', date: '2023-12-02', tags: ['crypto', 'technology'] },
        { id: 2, headline: 'Cut from projects, dropped by agents: How the Israel-Hamas war is dividing Hollywood', website: 'bbc.com', date: '2023-12-01', tags: ['healthcare', 'nature'] },
        { id: 3, headline: 'Cut from projects, dropped by agents: How the Israel-Hamas war is dividing Hollywood', website: 'bbc.com', date: '2023-12-01', tags: ['healthcare', 'nature'] },
        { id: 4, headline: 'Cut from projects, dropped by agents: How the Israel-Hamas war is dividing Hollywood', website: 'bbc.com', date: '2023-12-01', tags: ['healthcare', 'nature'] },
        { id: 5, headline: 'Cut from projects, dropped by agents: How the Israel-Hamas war is dividing Hollywood', website: 'bbc.com', date: '2023-12-01', tags: ['healthcare', 'nature'] },
        { id: 6, headline: 'Cut from projects, dropped by agents: How the Israel-Hamas war is dividing Hollywood', website: 'bbc.com', date: '2023-12-01', tags: ['healthcare', 'nature'] },
        { id: 7, headline: 'Cut from projects, dropped by agents: How the Israel-Hamas war is dividing Hollywood', website: 'bbc.com', date: '2023-12-01', tags: ['healthcare', 'nature'] },
        { id: 8, headline: 'Cut from projects, dropped by agents: How the Israel-Hamas war is dividing Hollywood', website: 'bbc.com', date: '2023-12-01', tags: ['healthcare', 'nature'] },
    ]);

    return <div>
        <h2 style={{marginBottom: "0em"}}>Relevant news</h2>
        <p style={{marginTop: "0.25em"}}>Our algorithm-curated set of news that you might find interesting to guide your choices in the trading world!</p>
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

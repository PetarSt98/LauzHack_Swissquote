import React, {useState} from 'react';
import './News.css';
import Card from "./components/Card";
import {CiFilter} from "react-icons/ci";
import "./News.css";

const Transactions = () => {
    const [transactions, setTransactions] = useState([
        {name: "Robe che ho comprato", action: "Buy", quantity: 5000, },
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
            {[].map(article => (
                <Card key={article.id} article={article} />
            ))}
        </div>
    </div>;
};

export default Transactions;

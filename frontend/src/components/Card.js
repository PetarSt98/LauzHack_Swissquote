import React from 'react';
import './Card.css'; // Assuming CSS is in this file

function formatDate(dateString) {
    // Parse the date string
    const [year, month, day] = dateString.split("-");

    // Create a new Date object
    const date = new Date(year, month - 1, day);

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get the day, month, and year
    const formattedDay = date.getDate();
    const formattedMonth = monthNames[date.getMonth()];
    const formattedYear = date.getFullYear();

    // Return the formatted date string
    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
}

const Card = ({ article }) => {
    return (
        <div className="card-container">
            <h3>{article.headline}</h3>
            <div className="caption">
                <span>{article.company}</span>
                <span>{formatDate(article.date)}</span>
            </div>
            <hr />
            <div className="badges">
                {article.keywords.map(tag => (
                    <span key={tag} className="badge">{tag}</span>
                ))}
            </div>
        </div>
    );
}

export default Card;

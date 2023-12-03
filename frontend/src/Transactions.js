import React, {useEffect, useState} from 'react';
import "./Transactions.css";
import axios from "axios";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    const currencySymbols = {
        EUR: '€',
        USD: '$',
        // Add more currencies as needed
    };

    const getCurrencySymbol = (currencyCode) => {
        return currencySymbols[currencyCode] || currencyCode;
    };

    useEffect(() => {
        axios.get(`http://giuseppesteduto.me:5000/user/transactions?user_id=1`)
            .then(res => {
                console.log('Raw response:', res);
                let data = res.data;

                // Manual JSON parsing if necessary
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        data = [];
                    }
                }

                // Check if the data is an array
                if (Array.isArray(data)) {
                    setTransactions(data);
                } else {
                    // Log the structure if it's not an array
                    console.log('Response is not an array:', data);
                    setTransactions([]);
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
    []);

    const TransactionRow = ({ transaction }) => (
        <div className="transaction-row">
            <div className="left-part">
                <div className="instrument-name">{transaction.NAME || 'N/A'}</div>
                <div className="action-type">{transaction.ACTION_TYPE}</div>
            </div>
            <div className="right-part">
                <div className="amount">{transaction.TOTAL_AMOUNT} {getCurrencySymbol(transaction.CURRENCY)}</div>
                <div className="date">{transaction.DATE_TRANSACTION.split(' ')[0]}</div>
            </div>
        </div>
    );

    return <div>
        <h2 style={{marginBottom: "0em"}}>Transactions</h2>
        <p style={{marginTop: "0.25em"}}>Your most recent activity on our platform - juicy!</p>
        <div className="transaction-list-container">
            <div className="transaction-table">
                {transactions.map((transaction, index) => (
                    <TransactionRow key={index} transaction={transaction} />
                ))}
            </div>
        </div>
    </div>;
};

export default Transactions;

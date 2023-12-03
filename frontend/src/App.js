import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import BottomNavbar from './BottomNavbar';
import './App.css'; // Your main CSS file
import './fonts.css'
import SwissquoteLogo from './assets/logo-swissquote-en.png'
import News from "./News";
import Transactions from "./Transactions";
import Notifications from "./Notifications";
import {requestForToken} from "./firebase";

const App = () => {
    requestForToken();

    return (
        <Router>
            <div className="app-container">
                <div className="header">
                    <img src={SwissquoteLogo}/>
                </div>
                <div className="body-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/notifications" element={<Notifications />} />
                    </Routes>
                </div>
                <BottomNavbar />
            </div>
        </Router>
    );
};

export default App;

// BottomNavbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import {CiBellOn, CiBullhorn, CiCircleList, CiCircleQuestion, CiUser} from "react-icons/ci";

import './BottomNavbar.css'; // Import your custom CSS

const BottomNavbar = () => {
    return (
    <>
        <div className="bottom-navbar">
            <NavLink to="/profile" className="to-be-activated" activeClassName="active">
                <CiUser className="icon"/>
                <div>Profile</div>
            </NavLink>
            <NavLink to="/transactions" className="to-be-activated" activeClassName="active">
                <CiCircleList className="icon"/>
                <div>Transactions</div>
            </NavLink>
            <NavLink to="/" className="center-button">
                <CiCircleQuestion size={50} />
            </NavLink>
            <NavLink to="/news" className="to-be-activated" activeClassName="active">
                <CiBullhorn className="icon"/>
                <div>&nbsp;News&nbsp;</div>
            </NavLink>
            <NavLink to="/notifications" className="to-be-activated" activeClassName="active">
                <CiBellOn className="icon"/>
                <div>Notifications</div>
            </NavLink>
        </div>
    </>
    );
};

export default BottomNavbar;

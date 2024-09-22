// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Create this CSS file for styling

const Header = () => {
    const userName = "John Doe"; // Replace this with actual logged-in user's name

    return (
        <header className="header">
            <div className="logo">
                SmartAgri
            </div>
            <nav className="nav-links">
            </nav>
            <div className="user-name">
                <span>{userName}</span>
            </div>
        </header>
    );
};

export default Header;

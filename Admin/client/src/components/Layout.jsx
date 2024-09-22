// src/components/Layout.jsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <Header />
            <div className="content">
                <main className="page-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;

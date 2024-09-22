import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="title">Admin Dashboard</div>
            <ul>
                <li>
                    <NavLink to="/" exact activeClassName="active">
                        <span className="icon">🏠</span>Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" activeClassName="active">
                        <span className="icon">👩🏻‍🤝‍🧑🏼</span>Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/genetics" activeClassName="active">
                        <span className="icon">📊</span>Genetic Crops
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/fertilizer" activeClassName="active">
                        <span className="icon">📦</span>Fertilizers
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/warehouses" activeClassName="active">
                        <span className="icon">📈</span>Distributions
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pest" activeClassName="active">
                        <span className="icon">💼</span>Pest & Disease
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

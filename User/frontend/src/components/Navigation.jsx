import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink for dynamic routing
import '../styles/Navigation.css';

const Navigation = () => {
    return (
        <div>
            {/* Responsive Navbar */}
            <Navbar expand="lg" bg="transparent" collapseOnSelect className="nav">
                <Container>
                    {/* Toggle button for small screens */}
                    <Navbar.Toggle aria-controls="navbar-responsive" />

                    {/* Collapsing Navbar links */}
                    <Navbar.Collapse id="navbar-responsive">
                        <Nav className="me-auto">
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? 'navigations active' : 'navigations'}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/genetic_home"
                                className={({ isActive }) => isActive ? 'navigations active' : 'navigations'}
                            >
                                Genetic Engineering
                            </NavLink>
                            <NavLink
                                to="/fertilizer_home"
                                className={({ isActive }) => isActive ? 'navigations active' : 'navigations'}
                            >
                                Fertilizers
                            </NavLink>
                            <NavLink
                                to="/warehouse_home"
                                className={({ isActive }) => isActive ? 'navigations active' : 'navigations'}
                            >
                                Distributions
                            </NavLink>
                            <NavLink
                                to="/pest_home"
                                className={({ isActive }) => isActive ? 'navigations active' : 'navigations'}
                            >
                                Pest & Diseases
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;

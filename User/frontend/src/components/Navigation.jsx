import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/Navigation.css';

const Navigation = () => {
    const [activeLink, setActiveLink] = useState('#home'); // default active link

    // Function to handle active link change
    const handleSelect = (selectedKey) => {
        setActiveLink(selectedKey);
    };

    return (
        <div>
            {/* Responsive Navbar */}
            <Navbar expand="lg" bg="transparent" collapseOnSelect className="nav">
                <Container>
                    {/* Toggle button for small screens */}
                    <Navbar.Toggle aria-controls="navbar-responsive" />

                    {/* Collapsing Navbar links */}
                    <Navbar.Collapse id="navbar-responsive">
                        <Nav className="me-auto" onSelect={handleSelect}>
                            <Nav.Link
                                href="#home"
                                className={`navigations ${activeLink === '#home' ? 'active' : ''}`}
                            >
                                About
                            </Nav.Link>
                            <Nav.Link
                                href="#genetic-engineering"
                                className={`navigations ${activeLink === '#genetic-engineering' ? 'active' : ''}`}
                            >
                                Genetic Engineering
                            </Nav.Link>
                            <Nav.Link
                                href="#fertilizers"
                                className={`navigations ${activeLink === '#fertilizers' ? 'active' : ''}`}
                            >
                                Fertilizers
                            </Nav.Link>
                            <Nav.Link
                                href="#distributions"
                                className={`navigations ${activeLink === '#distributions' ? 'active' : ''}`}
                            >
                                Distributions
                            </Nav.Link>
                            <Nav.Link
                                href="#pests-diseases"
                                className={`navigations ${activeLink === '#pests-diseases' ? 'active' : ''}`}
                            >
                                Pest & Diseases
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;

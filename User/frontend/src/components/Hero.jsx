import React, { useState } from 'react';
import { Container, Row, Col, Button, Nav, Card, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import genetic from '../images/features/DNA.png';
import recommend from '../images/features/Fertilizer.png';
import distribute from '../images/features/Warehouse.png';
import pest from '../images/features/Insect.png';

import benefit1 from '../images/descriptions/bene1.png'
import benefit2 from '../images/descriptions/bene2.png'
import benefit3 from '../images/descriptions/bene3.png'
import benefit4 from '../images/descriptions/bene4.png'

import farmer1 from '../images/farmers/farmer1.jpg'
import farmer2 from '../images/farmers/farmer2.jpg'
import farmer3 from '../images/farmers/farmer3.jpg'

import m1 from '../images/map/m1.png'
import m2 from '../images/map/m2.png'
import m3 from '../images/map/m3.png'
import m4 from '../images/map/m4.png'

import f1 from '../images/footer/Facebook.png'
import f2 from '../images/footer/Instagram.png'
import f3 from '../images/footer/TwitterX.png'

import video from '../videos/farming2.mp4'

import '../styles/Hero.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Hero = () => {

  const resources = [
    {
      id: 1,
      position: [6.9271, 79.8612], // Colombo
      name: 'Seed Supplier Colombo',
      image: m1, // Replace with your image path
    },
    {
      id: 2,
      position: [6.0250, 80.2190], // Galle
      name: 'Seed Supplier Galle',
      image: m1, // Replace with your image path
    },
    {
      id: 3,
      position: [5.9490, 80.4204], // Matara
      name: 'Agricultural Extension Service Matara',
      image: m2, // Replace with your image path
    },
    {
      id: 4,
      position: [8.3480, 80.4087], // Anuradhapura
      name: 'Fertilizer Supplier Anuradhapura',
      image: m3, // Replace with your image path
    },
    {
      id: 5,
      position: [7.4914, 81.0188], // Polonnaruwa
      name: 'Agricultural Extension Service Polonnaruwa',
      image: m2, // Replace with your image path
    },
    {
      id: 6,
      position: [6.0151, 81.1150], // Hambantota
      name: 'Medicine for pest Supplier Hambantota',
      image: m4, // Replace with your image path
    },
  ];
  
  const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    window.addEventListener('scroll', toggleVisibility);


  return (
    <div className="hero-section">
      
      <section className="video-section">
      <video className="video-video" autoPlay muted loop>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="video-overlay">
        <div className="video-content">
        <h1 className="t1">
          Sustainable <br />
          Agriculture
        </h1>
        <h2 className="t2">Empowering Farmers with Technology</h2>
        <p className="t3">
          SmartAgri provides innovative solutions for sustainable farming,{" "}
          <br />
          genetic engineering, optimized fertilizers, and pest & disease
          management, <br />
          enhancing agricultural productivity.
        </p>
        <Button className="gets" variant="success">
          Learn More
        </Button>
        </div>
      </div>
    </section>
      
      
      {/* <img src={heroImage} className="bgImage" /> */}
      
      <h2 className='about_title'>SmartAgri Features: Revolutionizing Farming</h2>
      <h3 className='about_subtitle'>Innovative Solutions for Modern Agricultural Challenges</h3>
      <div className="about">
        <div className="features">
          {/* Genetic Engineering */}
          <div className="feature_box">
            <div className="feature_icon">
              <img src={genetic} className="" />
            </div>
            <h4 className="feature_title">
              Genetic <br />
              Engineering
            </h4>
            <LinkContainer to='/genetic_home'>
              <Nav.Link>
                <div className="feature_btn">See More</div>
              </Nav.Link>  
            </LinkContainer>  
            <div class="description">
              Harness the power of Genetic Engineering to improve crop
              resilience and productivity. This feature offers cutting-edge
              solutions to modify crops, enhancing traits like drought
              resistance, pest tolerance, and nutritional value, ensuring
              sustainable farming and food security.
            </div>
          </div>

          {/* Fertilizer Recommender */}
          <div className="feature_box">
            <div className="feature_icon">
              <img src={recommend} className="" />
            </div>
            <h4 className="feature_title">
              Fertilizer <br />
              Recommender
            </h4>
            <LinkContainer to='/genetic_home'>
              <Nav.Link>
                <div className="feature_btn">See More</div>
              </Nav.Link>  
            </LinkContainer>  
            <div class="description">
              Our advanced Fertilizer Recommender system provides precise
              guidance on the optimal amount and type of fertilizer to use,
              based on soil conditions and crop requirements. This feature helps
              maximize crop yield while reducing waste and environmental impact.
            </div>
          </div>

          {/* Fertilizer Distribution */}
          <div className="feature_box">
            <div className="feature_icon">
              <img src={distribute} className="" />
            </div>
            <h4 className="feature_title">
              Warehouse and Distribution
              <br />
              Management
            </h4>
            <LinkContainer to='/warehouse_home'>
              <Nav.Link>
                <div className="feature_btn">See More</div>
              </Nav.Link>  
            </LinkContainer>  
            <div class="description">
              Efficiently manage and distribute agricultural products with our
              Warehouse Management system. It offers real-time inventory
              tracking, ensuring timely distribution of fertilizers, seeds, and
              other essential farming inputs.
            </div>
          </div>

          {/* Pest & Disease  */}
          <div className="feature_box">
            <div className="feature_icon">
              <img src={pest} className="" />
            </div>
            <h4 className="feature_title">
              Pest and Disease
              <br />
              Management
            </h4>
            <LinkContainer to='/genetic_home'>
              <Nav.Link>
                <div className="feature_btn">See More</div>
              </Nav.Link>  
            </LinkContainer>  
            <div class="description">
              Protect your crops from pests and diseases with our advanced
              monitoring and management tools. This feature offers tailored
              solutions for timely interventions, helping farmers minimize crop
              damage and maintain healthy yields.
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="benefits-section">
      <h2 className='why_title'>Why Choose SmartAgri?</h2>
      <h3 className='why_subtitle'>Empowering Farmers for a Sustainable Future</h3>
        
        <div className="benefits-container">
          
          <div className="benefit-box">
            <img src={benefit1} alt="Farmer-Focused Approach"  />
            <h4>Farmer-Focused Approach</h4>
            <p>
              At SmartAgri, we understand the unique challenges farmers face. We provide customized solutions 
              that help farmers enhance crop yields while minimizing resources like water and fertilizers. 
              This results in higher profitability with reduced costs, empowering them to thrive in today's competitive market.
            </p>
          </div>
          
          <div className="benefit-box">
            <img src={benefit2} alt="Technology-Driven" />
            <h4>Technology-Driven</h4>
            <p>
              SmartAgri leverages cutting-edge technologies like AI, Internet of Things (IoT), and advanced data analytics 
              to provide real-time insights. These innovations optimize decision-making, from planting to harvesting, 
              helping farmers make informed choices to maximize their productivity and profit.
            </p>
          </div>
          
          <div className="benefit-box">
            <img src={benefit3} alt="Environmental Sustainability" />
            <h4>Environmental Sustainability</h4>
            <p>
              Sustainability is at the core of SmartAgri. We are committed to promoting environmentally friendly practices, 
              such as water conservation, soil health improvement, and reducing the reliance on chemical inputs. Our solutions 
              aim to protect natural resources for future generations while maintaining high productivity.
            </p>
          </div>

          <div className="benefit-box">
            <img src={benefit4} alt="Community Support" />
            <h4>Community and Collaboration</h4>
            <p>
              SmartAgri builds a community of farmers where knowledge sharing and collaboration thrive. 
              We provide educational resources, access to expert advice, and platforms for farmers to share experiences, 
              ensuring a collective push towards more sustainable and profitable farming practices.
            </p>
          </div>
        </div>

        <Button variant="success" className="learn-more-btn">Learn More</Button>
      </section>


      {/* Success Stories  */}
      <section className="testimonials-section">
      <Container>
        <h2 className="testimonials_title">Testimonials & Success Stories</h2>
        <h3 className="testimonials_subtitle">What Farmers Say About SmartAgri</h3>

        {/* Case Studies */}
        <Row className="case-studies">
          <Col md={4}>
            <Card className='card'>
              <Card.Img variant="top" src={farmer1} alt="Farmer 1" />
              <Card.Body>
                <Card.Title>Farmer John Doe</Card.Title>
                <Card.Text>
                  "Using SmartAgri's fertilizer recommender, my yield increased by 20%!"
                </Card.Text>
                <p className="key-metric">+20% Crop Yield</p>
                <Button variant="success" className="more_btn">See More</Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={farmer3} alt="Farmer 2" />
              <Card.Body>
                <Card.Title>Farmer Jane Smith</Card.Title>
                <Card.Text>
                  "SmartAgri helped me save 30% on water usage while increasing productivity."
                </Card.Text>
                <p className="key-metric">-30% Water Usage</p>
                <Button variant="success" className="more_btn">See More</Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={farmer2} alt="Farmer 3" />
              <Card.Body>
                <Card.Title>Farmer Alex Green</Card.Title>
                <Card.Text>
                  "With SmartAgri’s pest management system, I saw a 50% reduction in crop loss."
                </Card.Text>
                <p className="key-metric">-50% Crop Loss</p>
                <Button variant="success" className="more_btn">See More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>

    <h2 className='map_title'>Explore Local Agricultural Resources</h2>
    <h3 className='map_subtitle'>Connect with Essential Supplies and Services in Your Community</h3>
    <div style={{ height: '500px', width: '1500px' }} className='map'>
      <MapContainer center={[6.9271, 79.8612]} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {resources.map(resource => (
          <Marker key={resource.id} position={resource.position}>
            <Popup>
              <div>
                <img src={resource.image} alt={resource.name} style={{ width: '50px', height: '50px' }} />
                <h4>{resource.name}</h4>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>

    <footer className="footer">
          <Container>
            <Row>
              <Col md={4} className="about-col">
                  <h4>About Us</h4>
                  <p style={{color: 'black'}}>
                      SmartAgri is dedicated to empowering farmers with innovative solutions for sustainable agriculture. Our platform leverages technology to improve crop yields and resource efficiency.
                  </p>
              </Col>
              <Col md={3} className="links-col">
                  <h5>Quick Links</h5>
                  <ul className="footer-links">
                      <li><a href="/about">About Us</a></li>
                      <li><a href="/contact">Contact Us</a></li>
                      <li><a href="/terms">Terms of Service</a></li>
                      <li><a href="/privacy">Privacy Policy</a></li>
                  </ul>
              </Col>
              <Col md={4} className="newsletter-col">
                  <h5>Stay Updated</h5>
                  <Form>
                      <Form.Group controlId="newsletterEmail">
                          <Form.Control type="email" placeholder="Enter your email" />
                      </Form.Group>
                      <Button variant="success" type="submit">
                          Subscribe
                      </Button>
                  </Form>
              </Col>
            </Row>
            <Row className="social-row">
              <Col className="text-center">
                  <h5>Follow Us</h5>
                  <div className="social-media">
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                          <img src={f1} alt="Facebook" />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                          <img src={f2} alt="Twitter" />
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                          <img src={f3} alt="Instagram" />
                      </a>
                  </div>
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-3">
                  <p>&copy; {new Date().getFullYear()} SmartAgri. All rights reserved.</p>
              </Col>
            </Row>
          </Container>
        </footer>

        <button
            className={`back-to-top ${visible ? 'visible' : ''}`}
            onClick={scrollToTop}
        >
            ☝️
        </button>
    </div>
  );
};

export default Hero;

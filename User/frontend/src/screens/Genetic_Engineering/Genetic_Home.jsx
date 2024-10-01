import React, { useState } from 'react';
import Navigation from '../../components/Navigation'
import { Button, Container, Nav, Row, Col, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../../screens/Genetic_Engineering/Genetic_home.css'

import Gene from '../../images/Genetic/gene.svg'
import Trait from '../../images/Genetic/Trait.jpg'
import Plan from '../../images/Genetic/plan.jpg'
import DB from '../../images/Genetic/DB.jpg'

import crop1 from '../../images/Genetic/crop1.jpg'
import crop2 from '../../images/Genetic/crop2.jpg'
import crop3 from '../../images/Genetic/crop3.jpg'
import crop4 from '../../images/Genetic/crop4.jpg'
import crop5 from '../../images/Genetic/crop5.jpg'
import crop6 from '../../images/Genetic/crop6.jpg'
import crop7 from '../../images/Genetic/crop7.jpg'
import crop8 from '../../images/Genetic/crop8.jpg'

import im1 from '../../images/Genetic/Barley.png'
import im2 from '../../images/Genetic/Biotech.png'
import im3 from '../../images/Genetic/Strategy.png'

import f1 from '../../images/footer/Facebook.png'
import f2 from '../../images/footer/Instagram.png'
import f3 from '../../images/footer/TwitterX.png'

function Genetic_Home() {

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
    <div>
      {/* Navigation Panel */}
      <Navigation />

      {/* Cover Image */}
      <img src={Gene} className="cover_image" />

      {/* Hero Section */}
      <section className="genetic-hero">
        <div className="hero-content">
          <h1>
            Unlock the Power of <br />
            Genetic Engineering
          </h1>
          <p>
            Empowering Farmers with Enhanced Crop Performance and Resilience
          </p>
          <button
            className="cta-btn"
            onClick={() =>
              document
                .getElementById("why")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore More
          </button>
        </div>
      </section>

      {/* Introduction to Genetic Engineering */}
      <section className="genetic-intro">
        <h2 className="intro_title">
          Introduction to Genetic Engineering in Agriculture
        </h2>
        <p className="introduction">
          Genetic engineering is revolutionizing agriculture by introducing
          crops that are more resistant to pests, drought, and diseases, and
          have better nutritional value. Learn how modern genetic techniques are
          being used to improve agricultural outcomes.
        </p>

        <div className="crop-images">
          <img
            src={crop1}
            alt="Genetically Modified Crop 1"
            className="crop-image-home"
          />
          <img
            src={crop4}
            alt="Genetically Modified Crop 2"
            className="crop-image-home"
          />
          <img
            src={crop3}
            alt="Genetically Modified Crop 3"
            className="crop-image-home"
          />
          <img
            src={crop2}
            alt="Genetically Modified Crop 3"
            className="crop-image-home"
          />
          <img
            src={crop5}
            alt="Genetically Modified Crop 1"
            className="crop-image-home"
          />
          <img
            src={crop6}
            alt="Genetically Modified Crop 2"
            className="crop-image-home"
          />
          <img
            src={crop7}
            alt="Genetically Modified Crop 3"
            className="crop-image-home"
          />
          <img
            src={crop8}
            alt="Genetically Modified Crop 3"
            className="crop-image-home"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="genetic-benefits" id="why">
        <div className="benefits-container">
          <p className="bene_title" style={{ fontSize: "60px" }}>
            Why Choose Genetic Engineering in Agriculture?
          </p>
          <p className="gene_desc">
            Genetic Engineering provides the tools to modify crops for better
            resilience against pests, <br /> climate changes, and increase
            productivity.
          </p>

          <div className="benefits-boxes">
            <div className="benefit-box">
              <img src={im1} alt="Modified Crops" className="bene_image" />{" "}
              <br />
              <h4 className="bene">Genetically Modified Crops</h4>
              <p className="bene_desc">
                Enhance crop yield and sustainability through advanced genetic
                engineering techniques.
              </p>
            </div>
            <div className="benefit-box">
              <img src={im3} alt="Modified Crops" className="bene_image" />
              <h4 className="bene">Customized Genetic Engineering Plans</h4>
              <p className="bene_desc">
                Tailored plans for farmers that outline how to implement genetic
                engineering practices, including crop selection and cultivation
                strategies.
              </p>
            </div>
            <div className="benefit-box">
              <img src={im2} alt="Trait Matching" className="bene_image" />
              <h4 className="bene">Trait Matching</h4>
              <p className="bene_desc">
                Helps farmers match the best traits to their specific
                agricultural needs, improving crop performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Genetic Engineering DB */}
      <section className="genetic_db">
        <img src={DB} className="trait_matching_image_db" />
        <div className="db_left">
          <h2 className="db_title">
            Genetic Engineering <br /> Database
          </h2>
          <h2 className="db_subtitle">
            Comprehensive Information at Your Fingertips
          </h2>
          <p className="db_desc">
            Access a vast, up-to-date database of genetically modified crops,{" "}
            <br />
            including detailed information on genetic traits, modification{" "}
            <br />
            techniques, and real-world applications. This resource helps farmers{" "}
            <br />
            and researchers stay informed about the latest advancements in{" "}
            <br />
            genetic engineering.
          </p>
          <LinkContainer to="/genetic_db">
            <Nav.Link>
              <button className="cta-btn-db">Access GDB</button>
            </Nav.Link>
          </LinkContainer>
        </div>
      </section>
      <br />

      {/* Guidelines for Farmers */}
      <section className="farmer-guidelines">
        <div className="left_side">
          <img src={Trait} className="trait_matching_image" />
          <div className="right_side">
            <h2 className="farmer_title">Genetic Trait Matching</h2>
            <h2 className="farmer_subtitle">
              Steps for Cultivating Genetically Modified Crops
            </h2>
            <p className="trait_matching">
              Cultivating genetically engineered crops requires br a combination
              of <br />
              modern farming practices and specific tools. Learn about the ideal{" "}
              <br />
              soil conditions, irrigation techniques, and pest management
              strategies to ensure successful yields.
            </p>
            <LinkContainer to="/genetic_trait">
              <Nav.Link>
                <button className="cta-btn-farmer">Match your Trait</button>
              </Nav.Link>
            </LinkContainer>
          </div>
        </div>
      </section>

      {/* Genetic Plan */}
      <section className="genetic_plan">
        <img src={Plan} className="trait_matching_image1" />
        <div className="plan_left">
          <h2 className="plan_title">Genetic Engineering Plan</h2>
          <h2 className="plan_subtitle">Personalized Plans for Farmers</h2>
          <p className="plan_desc">
            Our Genetic Engineering Plan offers tailored solutions to help
            farmers cultivate <br />
            genetically modified crops. These plans are based on your unique
            soil conditions, <br />
            crop type, and regional climate. Get step-by-step guidance on ideal
            soil preparation, <br />
            irrigation, pest control, and more to maximize your yield and
            sustainability.
          </p>
          <LinkContainer to="/genetic_plan">
            <Nav.Link>
              <button className="cta-btn-plan">Create Your Plan</button>
            </Nav.Link>
          </LinkContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row>
            <Col md={4} className="about-col">
              <h4>About Us</h4>
              <p style={{ color: "black" }}>
                SmartAgri is dedicated to empowering farmers with innovative
                solutions for sustainable agriculture. Our platform leverages
                technology to improve crop yields and resource efficiency.
              </p>
            </Col>
            <Col md={3} className="links-col">
              <h5>Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
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
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={f1} alt="Facebook" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={f2} alt="Twitter" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={f3} alt="Instagram" />
                </a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-3">
              <p>
                &copy; {new Date().getFullYear()} SmartAgri. All rights
                reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>

      <button
        className={`back-to-top ${visible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        ☝️
      </button>
    </div>
  );
}

export default Genetic_Home



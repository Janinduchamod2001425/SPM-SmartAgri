import { Container, Row, Col, Button } from 'react-bootstrap';
import heroImage from '../images/smart.jpeg';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <img src={heroImage} className='bgImage' alt='Smart Agriculture' />

      <div className='about'>
        <h1 className="t1">Sustainable Agriculture</h1>
        <h2 className="t2">Empowering Farmers with Technology</h2>
        <p className="t3">
          SmartAgri provides innovative solutions for sustainable farming, <br />
          genetic engineering, optimized fertilizers, and pest & disease management, <br />
          enhancing agricultural productivity.
        </p>
        <Button className='gets'>Get Started</Button>
      </div>

      <Container className='features'>
        <Row className='justify-content-center'>
          <Col md={6} lg={3} className='feature_box'></Col>
          <Col md={6} lg={3} className='feature_box'></Col>
          <Col md={6} lg={3} className='feature_box'></Col>
          <Col md={6} lg={3} className='feature_box'></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;

import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import heroImage from '../images/Home.jpg';

import genetic from '../images/features/DNA.png';
import recommend from '../images/features/Fertilizer.png';
import distribute from '../images/features/Warehouse.png';
import pest from '../images/features/Insect.png';

import f1 from '../images/descriptions/f1.jpg';
import f2 from '../images/descriptions/f2.jpg';
import f3 from '../images/descriptions/f3.jpg';
import f4 from '../images/descriptions/f4.jpg';

import '../styles/Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <img src={heroImage} className="bgImage" />

      <div className="about">
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
            <div className="feature_btn">See More</div>
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
              Warehouse
              <br />
              Management
            </h4>
            <div className="feature_btn">See More</div>
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
            <div className="feature_btn">See More</div>
            <div class="description">
              Protect your crops from pests and diseases with our advanced
              monitoring and management tools. This feature offers tailored
              solutions for timely interventions, helping farmers minimize crop
              damage and maintain healthy yields.
            </div>
          </div>
        </div>
      </div>

      <div className='why'>

        <h2 className='why_title'>Why Choose SmartAgri?</h2>
        <h3 className='why_subtitle'>Empowering Farmers for a Sustainable Future</h3>


        <div className="genetic_section">
          <div className="picture">
            <img src="" className="f_image" />
          </div>
        </div>

        <div className="genetic_section">
          <div className="picture2">
            <img src="" className="f_image2" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;

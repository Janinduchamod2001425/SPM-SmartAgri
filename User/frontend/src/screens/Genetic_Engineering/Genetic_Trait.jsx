import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { useMatchTraitsMutation } from '../../slices/traitApiSlice';
import { Form, Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Gene from '../../images/Genetic/trait.svg';

import '../../screens/Genetic_Engineering/Genetic_Trait.css'

const Genetic_Trait = () => {
  const [formData, setFormData] = useState({
    soilType: '',
    pest: '',
  });

  const [matchingCrops, setMatchingCrops] = useState([]);
  const [matchTraits, { isLoading, error }] = useMatchTraitsMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const crops = await matchTraits(formData).unwrap();
      setMatchingCrops(crops);
      toast.success('Matching crops found successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Error fetching matching crops:', err);
      toast.error('No matching crops found.', {
        position: "top-right",
        autoClose: 3000,
      });
      setMatchingCrops([]);
    }
  };

  return (
    <div>
      {/* Navigation Panel */}
      <Navigation />

      {/* Cover Image */}
      <img src={Gene} className="cover_image" alt="Cover" />

      {/* Hero Section */}
      <section className="genetic-hero">
        <div className="hero-content">
          <h1>Find the Best Crops <br />for Your Environment</h1>
          <p>Utilize Trait Matching to Optimize Crop Performance and Yield</p>
          <button
            className="cta-btn"
            onClick={() => document.getElementById("trait").scrollIntoView({ behavior: "smooth" })}
          >
            Start Matching Traits
          </button>
        </div>
      </section>

      {/* Instruction Table */}
      <section className="instruction-section">
        <h2 className="text-center mb-4 ins_trait">How to Match Traits</h2>
        <Table striped bordered hover className="instruction-table">
          <thead>
            <tr>
              <th>Trait</th>
              <th>How to Identify</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Soil Type</td>
              <td>Test the soil pH, texture (sand, clay, loam), and nutrient content.</td>
            </tr>
            <tr>
              <td>Pests/Diseases</td>
              <td>Identify common pests or diseases affecting your crops (e.g., aphids, fungal diseases).</td>
            </tr>
            <tr>
              <td>Weather Conditions</td>
              <td>Note the average rainfall, temperature, and humidity in your region.</td>
            </tr>
            <tr>
              <td>Water Availability</td>
              <td>Assess the irrigation methods and available water sources (e.g., river, well).</td>
            </tr>
          </tbody>
        </Table>
      </section>

      {matchingCrops.length > 0 && (
        <ul className="mt-4">
          {matchingCrops.map((crop) => (
            <li key={crop._id}>
              {crop.crop} - {crop.description}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-danger">No Matching Traits{error.message}</p>} {/* Error handling */}

      {/* Trait Matching Form */}
      <h2 id='trait' className="text-center mb-4 trait_title">Match Traits to Find Suitable Crops</h2>
      <Form onSubmit={handleSubmit} className="mb-4 trait_form">
        <Form.Group controlId="soilType">
          <Form.Label className="fw-bold trait_label">Soil Type:</Form.Label>
          <Form.Control
            as="select"
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            required
            className="trait_field"
          >
            <option value="">Select soil type</option>
            <option value="Loamy">Loamy</option>
            <option value="Silty Clay">Silty Clay</option>
            <option value="Clayey">Clayey</option>
            <option value="Fertile Loam">Fertile Loam</option>
            <option value="Clay">Clay</option>
            <option value="Sandy Loam">Sandy Loam</option>
          </Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="pest">
          <Form.Label className="fw-bold trait_label">Pests/Diseases:</Form.Label>
          <Form.Control
            as="select"
            name="pest"
            value={formData.pest}
            onChange={handleChange}
            required
            className="trait_field"
          >
            <option value="">Select pest or disease</option>
            <option value="Resistant to rust fungus">Resistant to rust fungus</option>
            <option value="Resistant to Fusarium wilt, but susceptible to aphids">Resistant to Fusarium wilt, but susceptible to aphids</option>
            <option value="Resistance to European corn borer">Resistance to European corn borer</option>
            <option value="Enhanced resistance to bacterial blight">Enhanced resistance to bacterial blight</option>
            <option value="Improved resistance to soybean aphid">Improved resistance to soybean aphid</option>
            <option value="Resistance to cotton bollworm">Resistance to cotton bollworm</option>
            <option value="Enhanced resistance to late blight">Enhanced resistance to late blight</option>
            <option value="Increased resistance to powdery mildew">Increased resistance to powdery mildew</option>
          </Form.Control>
        </Form.Group>

        <br />
        <div className="trait_button">
          <Button type="submit" variant="success" disabled={isLoading}>
            {isLoading ? <Loader /> : "Find Matching Crops"}
          </Button>
        </div>
      </Form>

      
    </div>
  );
}

export default Genetic_Trait;

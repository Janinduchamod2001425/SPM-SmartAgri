import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { useMatchTraitsMutation } from '../../slices/traitApiSlice';
import { Form, Button } from 'react-bootstrap';
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
      const crops = await matchTraits(formData).unwrap(); // Use unwrap for better error handling
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

      {/* Trait Matching Form */}
      <h2 id='trait' className="text-center mb-4 trait_title">Match Traits to Find Suitable Crops</h2>
      <Form onSubmit={handleSubmit} className="mb-4 trait_form">
        <Form.Group controlId="soilType">
          <Form.Label className="fw-bold trait_label">Soil Type:</Form.Label>
          <Form.Control className='trait_field'
            type="text"
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            required
            placeholder="Enter soil type"
          />
        </Form.Group>

        <Form.Group controlId="pest">
          <Form.Label className="fw-bold trait_label">Pests/Diseases:</Form.Label>
          <Form.Control className='trait_field'
            type="text"
            name="pest"
            value={formData.pest}
            onChange={handleChange}
            required
            placeholder="Enter pest or disease information"
          />
        </Form.Group>

        <div className="trait_button">
          <Button type="submit" variant="success" disabled={isLoading}>
            {isLoading ? <Loader /> : "Find Matching Crops"}
          </Button>
        </div>
      </Form>

      {matchingCrops.length > 0 && (
        <ul className="mt-4">
          {matchingCrops.map((crop) => (
            <li key={crop._id}>
              {crop.crop} - {crop.description}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-danger">Error: {error.message}</p>} {/* Error handling */}
    </div>
  );
}

export default Genetic_Trait;

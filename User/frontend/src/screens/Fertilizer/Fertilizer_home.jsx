import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navigation from '../../components/Navigation'; 
import axios from 'axios';
import { FaSeedling, FaStar } from 'react-icons/fa'; 
import './Fertilizer_home.css'; 

import Gene from '../../images/Fertilizer/f1.jpg'

function Fertilizer_home() {
  const [fercrop, setFercrop] = useState('');
  const [fersoil, setFersoil] = useState('');
  const [ferclimate, setFerclimate] = useState('');
  const [fername, setFername] = useState('');
  const [fertilizers, setFertilizers] = useState([]);
  const [soilOptions, setSoilOptions] = useState([]);
  const [climateOptions, setClimateOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  const cropOptions = [
    { crop: 'Paddy (Rice)', soils: ['Sandy', 'Clay'], climates: ['Wet', 'Intermediate'] },
    { crop: 'Tea', soils: ['Loam', 'Sandy'], climates: ['Wet', 'Dry'] },
    { crop: 'Coconut', soils: ['Sandy', 'Clay'], climates: ['Dry', 'Intermediate'] },
    { crop: 'Maize', soils: ['Loam', 'Clay'], climates: ['Dry', 'Wet'] },
    { crop: 'Pepper', soils: ['Clay', 'Loam'], climates: ['Intermediate', 'Wet'] },
    { crop: 'Vegetables', soils: ['Loam', 'Sandy'], climates: ['Dry', 'Wet'] },
    
  ];

  useEffect(() => {
    if (fercrop) {
      const selectedCrop = cropOptions.find(crop => crop.crop === fercrop);
      if (selectedCrop) {
        setSoilOptions(selectedCrop.soils);
        setClimateOptions(selectedCrop.climates);
      }
    }
  }, [fercrop]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!fercrop) {
      validationErrors.fercrop = 'Please choose a Crop Type';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const response = await axios.get('http://localhost:4000/api/recommendFertilizer', {
        params: { fercrop, fersoil, ferclimate, fername },
      });
      setFertilizers(response.data);
    } catch (error) {
      console.error("Error fetching fertilizers:", error);
    }
  };

  const handleClear = () => {
    setFercrop('');
    setFersoil('');
    setFerclimate('');
    setFername('');
    setSoilOptions([]);
    setClimateOptions([]);
    setFertilizers([]);
    setErrors({});
    setRating(0);
  };

  const handleRatingClick = (ratingValue) => {
    if (ratingValue === rating) {
      setRating(0);
    } else {
      setRating(ratingValue);
    }
  };

  const navigateToFeedbackPage = () => {
    navigate('/fertilizer_feedback'); // Navigate to the feedback page
  };



  return (
    <div className="fertilizer-imagecover">
      <Navigation />
     
     {/* Cover Image */}
     <img src={Gene} className="cover_image_ferti" />

      <div className="content-container">
        <h2>Fertilizer Recommendation</h2>
        <p className="description">
          Please select a crop type, soil, and climate conditions to get a list of <br/>
          recommended fertilizers suited to your agricultural needs.
          If the fertilizer you want is not listed, you can submit a feedback request below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Crop Type:</label>
            <select value={fercrop} onChange={(e) => setFercrop(e.target.value)}>
              <option value="">Select Crop Type</option>
              {cropOptions.map((crop, index) => (
                <option key={index} value={crop.crop}>{crop.crop}</option>
              ))}
            </select>
            {errors.fercrop && <p className="error-text">{errors.fercrop}</p>}
          </div>

          <div className="form-group">
            <label>Soil Type:</label>
            <select value={fersoil} onChange={(e) => setFersoil(e.target.value)} disabled={!fercrop}>
              <option value="">Select Soil Type</option>
              {soilOptions.map((soil, index) => (
                <option key={index} value={soil}>{soil}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Climate Type:</label>
            <select value={ferclimate} onChange={(e) => setFerclimate(e.target.value)} disabled={!fercrop}>
              <option value="">Select Climate Type</option>
              {climateOptions.map((climate, index) => (
                <option key={index} value={climate}>{climate}</option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">Get Fertilizers</button>
            <button type="button" onClick={handleClear} className="clear-button">Clear Fields</button>
            
              <button onClick={navigateToFeedbackPage} className="feedback-button">Submit Feedback</button>
            
         
          </div>

         
        </form>

        {fertilizers.length > 0 && (
          <>
            <div className="fertilizer-cards">
              <h3>Recommended Fertilizers</h3>
              <div className="card-container">
                {fertilizers.map((fertilizer, index) => (
                  <div key={index} className="fertilizer-card">
                    <h4>{fertilizer.fername}</h4>
                    <ul className="fertilizer-details">
                      <li><FaSeedling size={20}/> Details: {fertilizer.ferdetails}</li>
                      <li><FaSeedling size={20} /> Type: {fertilizer.fertype}</li>
                      <li><FaSeedling size={20} /> Manufacturer: {fertilizer.fermade}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rating-container">
              <h4 className="rating-text">How was your experience?</h4>
              <p className="rating-text">Give us a rate:</p>
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className="star"
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      size={30}
                      onClick={() => handleRatingClick(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  );
                })}
              </div>
              {rating > 0 && <p className="white-text">You rated this {rating} out of 5 stars.</p>}
            </div>

          </>
        )}
      </div>
    </div>
  );
}

export default Fertilizer_home;

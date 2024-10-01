import React, { useState } from 'react';
import { useCreateFeedbackMutation } from '../../slices/feedbackApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function FertilizerFeedback() {
  const [feedbackname, setFeedbackname] = useState('');
  const [feedbackconsern, setFeedbackconsern] = useState('');
  const [feedbackemail, setFeedbackemail] = useState('');
  const [feedbacknumber, setFeedbacknumber] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validation logic
    if (!feedbackname) validationErrors.feedbackname = 'Feedback name is required';
    if (!feedbackconsern) validationErrors.feedbackconsern = 'Concern is required';
    if (!feedbackemail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackemail)) validationErrors.feedbackemail = 'A valid email is required';
    if (!feedbacknumber || !/^[0-9]{10}$/.test(feedbacknumber)) validationErrors.feedbacknumber = 'A valid 10-digit contact number is required';

    // If there are validation errors, set them and stop form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    try {
      // Send feedback via API
      await createFeedback({
        feedbackname,
        feedbackconsern,
        feedbackemail,
        feedbacknumber,
      }).unwrap();

      setFeedbackSent(true);
      toast.success("Feedback Submitted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        style: {
          backgroundColor: "#c4f9a9",
          color: "black",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "monospace",
        },
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("There was an error submitting your feedback. Please try again later.");
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        height: '100vh',
        backgroundImage: 'url(/image1.jpg)', // Set your background image path
        backgroundSize: 'cover', // Cover the whole div
        backgroundPosition: 'center', // Center the image
      }}
    >
      {feedbackSent ? (
        <div style={{ textAlign: 'center', color: 'black' }}>
          <div style={{
            backgroundColor: '#c4f9a9', // Light green background
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px', // Space between the card and other content
          }}>
            <h3 style={{ margin: '0' }}>Feedback Sent Successfully!</h3>
            <p style={{ margin: '0' }}>Thank you for your feedback. We will review your request.</p>
          </div>
          <button
            onClick={() => navigate('/fertilizer_home')} // Navigate to fertilizer_home
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
           Fertilizer Page
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            width: '300px',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Feedback Name:</label>
            <input
              type="text"
              value={feedbackname}
              onChange={(e) => setFeedbackname(e.target.value)}
              placeholder="Enter feedback name"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            {errors.feedbackname && <p style={{ color: 'red', fontSize: '12px' }}>{errors.feedbackname}</p>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Concern:</label>
            <input
              type="text"
              value={feedbackconsern}
              onChange={(e) => setFeedbackconsern(e.target.value)}
              placeholder="Enter your concern"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            {errors.feedbackconsern && <p style={{ color: 'red', fontSize: '12px' }}>{errors.feedbackconsern}</p>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              value={feedbackemail}
              onChange={(e) => setFeedbackemail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            {errors.feedbackemail && <p style={{ color: 'red', fontSize: '12px' }}>{errors.feedbackemail}</p>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Contact Number:</label>
            <input
              type="text"
              value={feedbacknumber}
              onChange={(e) => setFeedbacknumber(e.target.value)}
              placeholder="Enter your contact number (10 digits)"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            {errors.feedbacknumber && <p style={{ color: 'red', fontSize: '12px' }}>{errors.feedbacknumber}</p>}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px', // Add some space below the submit button
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/fertilizer_home')} // Navigate to fertilizer_home
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff', // Bootstrap primary color
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Fertilizer Page
          </button>
        </form>
      )}
    </div>
  );
}

export default FertilizerFeedback;

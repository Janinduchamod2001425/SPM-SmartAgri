import React, { useState } from 'react';
import { useCreateFeedbackMutation } from '../../slices/feedbackApiSlice';
import { toast } from 'react-toastify';
import Navigation from '../../components/Navigation';
import './FertilizerFeedback.css'; 

function FertilizerFeedback() {
  const [feedbackname, setFeedbackname] = useState('');
  const [feedbackconsern, setFeedbackconsern] = useState('');
  const [feedbackemail, setFeedbackemail] = useState('');
  const [feedbacknumber, setFeedbacknumber] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [errors, setErrors] = useState({});
  
  
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

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
      toast.success("Feedback Sent Successfully!", { autoClose: 3000 });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("There was an error submitting your feedback. Please try again later.");
    }
  };

  return (
    <div className="fertilizer-container">
      <Navigation />
      <h2>Submit Feedback for Fertilizer</h2>
      {feedbackSent ? (
        <div className="feedback-success">
          <h3>Feedback Sent Successfully!</h3>
          <p>Thank you for your feedback. We will review your request.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {errors.general && <p className="error-text">{errors.general}</p>}

          <div className="form-group">
            <label>Feedback Name:</label>
            <input
              type="text"
              value={feedbackname}
              onChange={(e) => setFeedbackname(e.target.value)}
              placeholder="Enter feedback name"
            />
            {errors.feedbackname && <p className="error-text">{errors.feedbackname}</p>}
          </div>

          <div className="form-group">
            <label>Concern:</label>
            <input
              type="text"
              value={feedbackconsern}
              onChange={(e) => setFeedbackconsern(e.target.value)}
              placeholder="Enter your concern"
            />
            {errors.feedbackconsern && <p className="error-text">{errors.feedbackconsern}</p>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={feedbackemail}
              onChange={(e) => setFeedbackemail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.feedbackemail && <p className="error-text">{errors.feedbackemail}</p>}
          </div>

          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              value={feedbacknumber}
              onChange={(e) => setFeedbacknumber(e.target.value)}
              placeholder="Enter your contact number (10 digits)"
            />
            {errors.feedbacknumber && <p className="error-text">{errors.feedbacknumber}</p>}
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      )}
    </div>
  );
}

export default FertilizerFeedback;

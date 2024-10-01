import asyncHandler from 'express-async-handler';
import Feedback from '../models/feedbackModel.js';

// Create feedback
const createFeedback = asyncHandler(async (req, res) => {
  const { feedbackname, feedbackconsern, feedbackemail, feedbacknumber } = req.body;

  // Retrieve authenticated user's ID from req.user
  const cropManagerId = req.user._id;

  // Check if the crop manager ID is valid
  if (!cropManagerId) {
    res.status(401);
    throw new Error('User not authorized or crop manager ID missing');
  }

  // Create a new feedback associated with the authenticated crop manager
  const newFeedback = await Feedback.create({
    feedbackname,
    feedbackconsern,
    feedbackemail,
    feedbacknumber,
    cropManager: cropManagerId, // Set the crop manager to the authenticated user's ID
  });

  // Check if the feedback was created successfully
  if (newFeedback) {
    res.status(201).json(newFeedback);
  } else {
    res.status(400);
    throw new Error('Failed to create new feedback');
  }
});

// Get feedback by crop manager ID
const getFeedback = asyncHandler(async (req, res) => {
  const cropManagerId = req.params.cropManagerId; // Get cropManagerId from request parameters

  const feedback = await Feedback.find({ cropManager: cropManagerId });

  if (feedback.length > 0) {
    res.status(200).json(feedback);
  } else {
    res.status(404);
    throw new Error('No feedback available for this crop manager ID');
  }
});

// Delete feedback by ID
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (feedback) {
    await feedback.remove();
    res.status(200).json({ message: 'Feedback removed' });
  } else {
    res.status(404);
    throw new Error('Feedback not found');
  }
});

export { createFeedback, getFeedback ,deleteFeedback};

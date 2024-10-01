import express from 'express';
import { createFeedback, getFeedback,deleteFeedback } from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/newfeedback').post(protect, createFeedback);
router.route('/getfeedback/:cropManagerId').get(getFeedback);
router.route('/:id').delete(protect, deleteFeedback); // New delete route

export default router;

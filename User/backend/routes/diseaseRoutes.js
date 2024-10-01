import express from 'express';
import { createDisease, getDisease } from '../controllers/diseaseController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/newdisease').post(protect, createDisease);
router.route('/getdisease/:pestManagerId').get(getDisease);

export default router;
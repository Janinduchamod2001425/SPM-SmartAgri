import express from 'express';
import { createPlan, getGeneticPlan } from '../controllers/traitController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/newplan").post(protect, createPlan);
router.get("/getplan/:farmerId", getGeneticPlan);

export default router;
import express from 'express';
import { createPlan, getGeneticPlan, matchTraits } from '../controllers/traitController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/newplan").post(protect, createPlan);
router.get("/getplan/:farmerId", getGeneticPlan);
router.post("/match_traits", matchTraits);


export default router;
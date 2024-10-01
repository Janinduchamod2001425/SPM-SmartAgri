import express from "express";

import { recommendFertilizers} from "../controller/fertilizerRecommendController.js";

const router = express.Router();





router.get('/recommendFertilizer', recommendFertilizers);
export default router;



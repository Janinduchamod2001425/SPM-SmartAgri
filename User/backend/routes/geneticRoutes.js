import express from "express";
import { getCropDetails } from "../controllers/geneticController.js";

const router = express.Router();

router.route("/getallcrops").get(getCropDetails);

export default router;
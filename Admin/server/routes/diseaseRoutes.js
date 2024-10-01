import express from "express";

import { generateDiseaseReport } from '../controller/diseaseController.js'; // Import the report generation functio
import {  diseasegetAll } from "../controller/diseaseController.js";


const route = express.Router();

route.get("/diseasegetAll",diseasegetAll);

route.get('/generateDiseaseReport', generateDiseaseReport);


export default route;
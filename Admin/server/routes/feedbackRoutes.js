import express from "express";

import { feedbackdelete , feedbackgetAll } from "../controller/feedbackController.js";


const route = express.Router();

route.get("/feedbackgetAll",feedbackgetAll);
route.delete("/feedbackdelete/:id",feedbackdelete);



export default route;
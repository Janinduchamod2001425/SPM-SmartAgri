import express from "express";
import { createFertilizerReq,geFertilizerReqs,getFertilizerReq,deleteFertilizerReq} from "../controller/fertilizerReqController.js";

const route = express.Router();


// post a new request
route.post("/createFertilizerReq",createFertilizerReq);
//get all requests
route.get("/geFertilizerReqs",geFertilizerReqs);
//get a single request
route.get("/getFertilizerReq/:id",getFertilizerReq);
// delete a request
route.delete("/deleteFertilizerReq/:id",deleteFertilizerReq);


export default route;
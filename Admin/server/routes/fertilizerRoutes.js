import express from "express";

import { fcreate, fdelete, fgetAll, fgetone, fupdate,recommendFertilizers,generateFertilizerReport } from "../controller/fertilizerController.js";


const route = express.Router();

route.post("/fcreate",fcreate);
route.get("/fgetall",fgetAll);
route.get("/fgetone/:id",fgetone);
route.put("/fupdate/:id",fupdate);
route.delete("/fdelete/:id",fdelete);
route.get('/recommendFertilizer', recommendFertilizers);

route.get('/FertilizerAdminReport', generateFertilizerReport);


export default route;
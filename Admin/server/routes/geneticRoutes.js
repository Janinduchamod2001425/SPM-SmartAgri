import express from "express";
import {
  createGenetic,
  getAll,
  getOne,
  updateGeneticData,
  deleteGeneticData,
} from "../controller/geneticController.js";

const route = express.Router();

route.post("/creategenetic", createGenetic);
route.get("/getallgenetic", getAll);
route.get("/getonegenetic/:id", getOne);
route.put("/updategenetic/:id", updateGeneticData);
route.delete("/deletegenetic/:id", deleteGeneticData);

export default route;

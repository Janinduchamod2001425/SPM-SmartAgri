import express from "express";
import {
  createWarehouse,
  getWarehouses,
  getWarehouse,
  deleteWarehouse,
  updateWarehouse,
} from "../controller/warehouseController.js";

const route = express.Router();

// post a new warehouse
route.post("/createWarehouse", createWarehouse);
//get all warehouses
route.get("/getWarehouses", getWarehouses);
//get a single warehouse
route.get("/getWarehouse/:id", getWarehouse);
// delete a warehouse
route.delete("/deleteWarehouse/:id", deleteWarehouse);
// update a warehouse
route.patch("/updateWarehouse/:id", updateWarehouse);

export default route;

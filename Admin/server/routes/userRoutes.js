import express from "express";
import {
  create,
  getAll,
  getOne,
  updateUser,
  deleteUser,
  countUsers,
} from "../controller/userController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", updateUser);
route.delete("/delete/:id", deleteUser);
route.get("/count", countUsers);

export default route;

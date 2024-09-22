import express from "express";
import {
  pcreate,
  pgetAll,
  pgetOne,
  pupdate,
  pdelete,
} from "../controller/pestController.js";

const route = express.Router();

route.post("/pcreate", pcreate);
route.get("/pgetall", pgetAll);
route.get("/pgetone/:id", pgetOne);
route.put("/pupdate/:id", pupdate);
route.delete("/pdelete/:id", pdelete);

export default route;

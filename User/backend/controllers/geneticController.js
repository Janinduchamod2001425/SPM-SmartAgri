import asyncHandler from "express-async-handler";
import GeneticDB from "../models/geneticModel.js";

const getCropDetails = asyncHandler(async (req, res) => {
  const crops = await GeneticDB.find();
  res.status(200).json(crops);
});

export { getCropDetails };
import asyncHandler from "express-async-handler";
import GeneticPlan from "../models/traitModel.js";

const createPlan = asyncHandler(async (req, res) => {
  const { username, cropType, trait, farmSize, soilType, pest, plantingDate } =
    req.body;

  // Retrieve authenticated user's ID from req.user
  const userId = req.user._id;

  // Check if the user ID is valid
  if (!userId) {
    res.status(401);
    throw new Error("User not authorized or user ID missing");
  }

  // Create a new Genetic Plan associated with the authenticated user
  const newPlan = await GeneticPlan.create({
    username,
    cropType,
    trait,
    farmSize,
    soilType,
    pest,
    plantingDate,
    farmer: userId // Set the farmer to the authenticated user's ID
  });

  // Check if the plan was created successfully
  if(newPlan) {
    res.status(201).json(newPlan);
  } else {
    res.status(400);
    throw new Error("Failed to create new plan");
  }
}); 

const getGeneticPlan = asyncHandler(async (req, res) => {
    const farmerId = req.params.farmerId; // Get farmerId from request parameters

    const plan = await GeneticPlan.find({ farmer: farmerId });

    if(plan) {
        res.status(200).json(plan);
    } else {
        res.status(404);
        throw new Error("No Genetic Plans Available for your ID");
    }
});

export { createPlan, getGeneticPlan }; 
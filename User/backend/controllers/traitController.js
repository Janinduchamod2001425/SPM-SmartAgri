import asyncHandler from "express-async-handler";
import GeneticPlan from "../models/traitModel.js";
import GeneticDB from "../models/geneticModel.js";

const createPlan = asyncHandler(async (req, res) => {
  const { username, cropType, trait, farmSize, soilType, pest, plantingDate } =
    req.body;

  // Basic validations
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: "Invalid username" });
  }
  if (!cropType || !['Corn', 'Wheat', 'Rice', 'Soybean', 'Other'].includes(cropType)) {
    return res.status(400).json({ message: "Invalid crop type" });
  }
  if (!trait || typeof trait !== 'string') {
    return res.status(400).json({ message: "Invalid trait" });
  }
  if (!soilType || !['Clay', 'Sandy', 'Loamy', 'Silt', 'Other'].includes(soilType)) {
    return res.status(400).json({ message: "Invalid soil type" });
  }
  if (!pest || typeof pest !== 'string') {
    return res.status(400).json({ message: "Invalid pest" });
  }
  if (!plantingDate || isNaN(Date.parse(plantingDate))) {
    return res.status(400).json({ message: "Invalid planting date" });
  }

  // Check if the planting date is in the past
  const currentDate = new Date();
  const parsedPlantingDate = new Date(plantingDate);
  if (parsedPlantingDate < currentDate) {
    return res.status(400).json({ message: "Planting date cannot be in the past" });
  }

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
  if (newPlan) {
    res.status(201).json(newPlan);
  } else {
    res.status(400);
    throw new Error("Failed to create new plan");
  }
}); 

const getGeneticPlan = asyncHandler(async (req, res) => {
    const farmerId = req.params.farmerId; // Get farmerId from request parameters

    const plan = await GeneticPlan.find({ farmer: farmerId });

    if (plan) {
        res.status(200).json(plan);
    } else {
        res.status(404);
        throw new Error("No Genetic Plans Available for your ID");
    }
});

const matchTraits = asyncHandler(async (req, res) => {
  const { soilType, pest } = req.body;

  // Validate input
  if (!soilType || !pest) {
    res.status(400);
    throw new Error("Please provide all required fields.");
  }

  // Query the Genetic DB to find matching crops
  const matchingCrops = await GeneticDB.find({
    soil_type: soilType,
    pests_diseases: { $regex: pest, $options: 'i' } // Using regex for partial match
  });

  if (matchingCrops.length > 0) {
    res.status(200).json(matchingCrops);
  } else {
    res.status(404).json({ message: "No matching crops found." });
  }
});

export { createPlan, getGeneticPlan, matchTraits };

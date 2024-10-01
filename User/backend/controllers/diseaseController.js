import asyncHandler from "express-async-handler";
import Disease from "../models/diseaseModel.js";



const createDisease = asyncHandler(async (req, res) => {
  const { disename, rating, feedback  } =
    req.body;

  // Retrieve authenticated user's ID from req.user
  const pestManagerId = req.user._id;

  // Check if the user ID is valid
  if (!pestManagerId) {
    res.status(401);
    throw new Error("User not authorized or user ID missing");
  }

  // Create a new Genetic Plan associated with the authenticated user
  const newDisease = await Disease.create({
    disename,
    rating,
    feedback,
   
    pestManager: pestManagerId // Set the farmer to the authenticated user's ID
  });

  // Check if the plan was created successfully
  if(newDisease) {
    res.status(201).json(newDisease);
  } else {
    res.status(400);
    throw new Error("Failed to create new plan");
  }
}); 

const getDisease = asyncHandler(async (req, res) => {
    const pestManagerId = req.params.pestManagerId; // Get farmerId from request parameters

    const disease = await Disease.find({ pestManager: pestManagerId });

    if(disease) {
        res.status(200).json(disease);
    } else {
        res.status(404);
        throw new Error("No Genetic Plans Available for your ID");
    }
});

export { createDisease, getDisease }; 
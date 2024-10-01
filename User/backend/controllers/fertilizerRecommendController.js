import Fertilizer from "../Admin/server/model/fertilizerModel.js";

// Controller to recommend fertilizers
export const recommendFertilizers = async (req, res) => {
  const { fercrop, fersoil, ferclimate, fername } = req.query;
  
  try {
    // Build query dynamically based on user input
    let query = {};

    if (fercrop) query.cropType = fercrop;
    if (fersoil) query.soilType = fersoil;
    if (ferclimate) query.climateType = ferclimate;
    if (fername) query.name = new RegExp(fername, 'i'); // Case-insensitive name search

    // Query MongoDB for matching fertilizers
    const fertilizers = await Fertilizer.find(query);
    
    res.json(fertilizers);
  } catch (error) {
    console.error("Error fetching fertilizers:", error);
    res.status(500).send('Server Error');
  }
};

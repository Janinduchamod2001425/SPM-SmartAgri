import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  scientific_name: { type: String, required: true },
  variety: { type: String, required: true },
  region: { type: String, required: true },
  trait_name: { type: String, required: true },
  gene_associated: { type: String, required: true },
  modification_method: { type: String, required: true },
  description: { type: String, required: true },
  modification_id: { type: String, required: true },
  target_gene: { type: String, required: true },
  modification_technique: { type: String, required: true },
  outcomes: { type: String, required: true },
  soil_type: { type: String, required: true },
  climate: { type: String, required: true },
  pests_diseases: { type: String, required: true },
  economic_impact: { type: String, required: true },
  environmental_impact: { type: String, required: true },
  social_impact: { type: String, required: true },
});

export default mongoose.model("Genetic", CropSchema);

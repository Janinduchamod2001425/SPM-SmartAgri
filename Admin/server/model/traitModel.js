import mongoose from "mongoose";

const geneticPlanSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    cropType: {
      type: String,
      required: true,
    },
    trait: {
      type: String,
      required: true,
    },
    farmSize: {
      type: String,
      required: true,
    },
    soilType: {
      type: String,
      required: true,
    },
    pest: {
      type: String,
      required: true,
    },
    plantingDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GeneticPlan = mongoose.model("Genetic_Plan", geneticPlanSchema);

export default GeneticPlan;
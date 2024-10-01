import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema(
  {
    disename: {
      type: String,
      required: true,
    },
    rating: {
      type: Number, // Changed to Number type for rating
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    pestManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming your User model is singular
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Disease = mongoose.model("Disease", diseaseSchema);
export default Disease;

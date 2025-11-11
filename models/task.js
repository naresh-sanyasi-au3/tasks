import mongoose from "mongoose";

// Define schema for Task
const taskSchema = new mongoose.Schema(
  {
    // Task name (required)
    name: {
      type: String,
      required: true,
    },
    // Task description (required)
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);


export default mongoose.model("task", taskSchema);

import mongoose from "mongoose";

// Define schema for TaskStatus
const taskStatusSchema = new mongoose.Schema(
  {
    // Reference to the Task this status belongs to
    taskId: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
      ref: "task", // Reference to the 'task' collection
    },
    // Status of the task
    status: {
      type: String,
      required: [true, "Status is required"], // Field is mandatory
      enum: ["Pending", "In Progress", "Completed"], // Allowed values
      default: "Pending", // Default value if not provided
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);


export default mongoose.model("taskstatus", taskStatusSchema);

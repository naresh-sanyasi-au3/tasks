import mongoose from "mongoose";

const taskStatusSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("taskstatus", taskStatusSchema);

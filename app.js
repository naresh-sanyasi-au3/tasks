// src/app.js
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();

// Enable CORS to allow requests from other domains
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount task-related routes at /tasks
app.use("/tasks", taskRoutes);

// Handle errors in a centralized way
app.use(errorHandler);

export default app;




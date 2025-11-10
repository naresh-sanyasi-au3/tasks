// src/app.js
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Error handler
app.use(errorHandler);

export default app;

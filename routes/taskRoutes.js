import express from "express";
const router = express.Router();

import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { validateTask, validateId }  from "../validator/taskValidator.js";


// Create a new task
// POST /tasks
router.post("/", validateTask, createTask);

// Get all tasks
// GET /tasks
router.get("/", getAllTasks);

// Update a task by ID
// PUT /tasks/:id
router.put("/:id", validateId, validateTask, updateTask);

// Delete a task by ID
// DELETE /tasks/:id
router.delete("/:id", validateId, deleteTask);

export default router;

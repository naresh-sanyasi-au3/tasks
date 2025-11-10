import express from "express";
// const router = express.Router();

// import * as task from "../controllers/taskController.js";
const router = express.Router();

import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";


import { validateTask, validateId }  from "../validator/taskValidator.js";


router.post("/", validateTask, createTask);
router.get("/", getAllTasks);
router.put("/:id", validateId, validateTask, updateTask);
router.delete("/:id", validateId, deleteTask);

export default router;

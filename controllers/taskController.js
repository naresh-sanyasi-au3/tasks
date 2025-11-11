import * as taskService from "../services/taskService.js";

// Controller to create a new task
export const createTask = async (req, res, next) => {
  try {
    // Call the service to create a task with request data
    const task = await taskService.createTask(req.body);

    // Select only necessary fields to return in response
    const filteredTask = {
      id: task._id,
      name: task.name,
      description: task.description,
      status: task.status,
    };

    // Send success response with created task
    let resp = { message: "Task Created Successfully", data: filteredTask };
    res.status(201).json(resp);
  } catch (error) {
    // Set error status and pass it to error-handling middleware
    error.statusCode = 400;
    next(error);
  }
};

// Controller to fetch all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    // Call the service to get all tasks from the database
    const tasks = await taskService.getAllTasks();

    // Send success response with the list of tasks
    let resp = { message: "Tasks Fetched Successfully", data: tasks };
    res.status(200).json(resp);
  } catch (error) {
    // Set error status and pass it to error-handling middleware
    error.statusCode = 400;
    next(error);
  }
};

// Controller to update a specific task by ID
export const updateTask = async (req, res, next) => {
  try {
    // Call the service to update the task with given ID and request data
    const task = await taskService.updateTask(req.params.id, req.body);

    // If task not found, return 404
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Select only necessary fields to return in response
    const filteredTask = {
      id: task._id,
      name: task.name,
      description: task.description,
      status: task.status,
    };

    // Send success response with updated task
    let resp = { message: "Task Updated Successfully", data: filteredTask };
    res.status(200).json(resp);

  } catch (error) {
    // Set error status and pass it to error-handling middleware
    error.statusCode = 400;
    next(error);
  }
};

// Controller to delete a specific task by ID
export const deleteTask = async (req, res, next) => {
  try {
    // Call the service to delete the task with the given ID
    const task = await taskService.deleteTask(req.params.id);

    // If task not found, return 404
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Send success response confirming deletion
    res.status(200).json({ message: "Task Deleted Successfully" });
    
  } catch (error) {
    // Set error status and pass it to error-handling middleware
    error.statusCode = 400;
    next(error);
  }
};


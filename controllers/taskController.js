import * as taskService from "../services/taskService.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);

    const filteredTask = {
      id: task._id,
      name: task.name,
      description: task.description,
      status: task.status,
    };
    let resp = { data: filteredTask, message: "Task Created Succesfully" };
    res.status(201).json(resp);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    let resp = { data: tasks, message: "Task Fetched Succesfully" };
    res.status(200).json(resp);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const filteredTask = {
      id: task._id,
      name: task.name,
      description: task.description,
      status: task.status,
    };
    let resp = { data: filteredTask, message: "Task Updated Succesfully" };
    res.status(200).json(resp);
    
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

import * as taskService from "../services/taskService.js";
// create a task
export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);

    const filteredTask = {
      id: task._id,
      name: task.name,
      description: task.description,
      status: task.status,
    };
    let resp = {message: "Task Created Succesfully", data: filteredTask};
    res.status(201).json(resp);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

// get all task
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    let resp = {message: "Task Fetched Succesfully", data: tasks};
    res.status(200).json(resp);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
// update a task
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
    let resp = {message: "Task Updated Succesfully" , data: filteredTask};
    res.status(200).json(resp);
    
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

// delete a task
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

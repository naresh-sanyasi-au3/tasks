import Task from "../models/task.js";
import TaskStatus from "../models/taskStatus.js";

// Service to create a new task along with its status
export const createTask = async (taskData) => {
  try {
    // Create the task with name and description
    const task = await Task.create({
      name: taskData.name,
      description: taskData.description,
    });

    // Create the task status, defaulting to "Pending" if not provided
    const status = await TaskStatus.create({
      taskId: task._id,
      status: taskData.status || "Pending",
    });

    // Combine task and status into a single response object
    let taskResp = { ...task?.toObject(), status: status?.toObject().status };

    return taskResp;
  } catch (error) {
    // Throw error to be handled by controller
    throw new Error(error);
  }
};

// Service to fetch all tasks along with their status
export const getAllTasks = async () => {
  try {
    // Aggregate tasks with their status from the TaskStatus collection
    const tasksWithStatus = await Task.aggregate([
      {
        $lookup: {
          from: "taskstatuses",      // Join with taskstatuses collection
          localField: "_id",         // Task _id
          foreignField: "taskId",    // Matches taskId in TaskStatus
          as: "statusInfo",           // Output array field
        },
      },
      {
        $unwind: {
          path: "$statusInfo",       // Flatten the statusInfo array
          preserveNullAndEmptyArrays: true, // Keep tasks even if no status exists
        },
      },
      {
        $project: {
          id: "$_id",                // Map _id to id
          name: 1,                   // Include name
          description: 1,            // Include description
          status: "$statusInfo.status", // Include status
          _id: 0,                    // Exclude original _id
        },
      },
    ]);

    return tasksWithStatus;          // Return aggregated tasks
  } catch (error) {
    // Throw error to be handled by controller
    throw new Error(error);
  }
};

// Service to update a task and its status by ID
export const updateTask = async (id, taskData) => {
  try {
    // Update task's name and description
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name: taskData.name, description: taskData.description },
      { new: true } // Return the updated document
    );

    // If task not found, throw error
    if (!updatedTask) {
      throw new Error("Task not found");
    }

    // Update task status if provided
    let updatedStatus = null;
    if (taskData.status) {
      updatedStatus = await TaskStatus.findOne({ taskId: id });
      if (updatedStatus) {
        updatedStatus.status = taskData.status;
        await updatedStatus.save();
      }
    }

    // Combine task and status into a single response object
    let taskResp = updatedStatus
      ? { ...updatedTask?.toObject(), status: updatedStatus?.toObject()?.status }
      : { ...updatedTask?.toObject() };

    return taskResp;
  } catch (error) {
    // Throw error to be handled by controller
    throw new Error(error);
  }
};

// Service to delete a task and its status by ID
export const deleteTask = async (id) => {
  try {
    // Delete the task by ID
    const task = await Task.findByIdAndDelete(id);

    // If task not found, throw error
    if (!task) {
      throw new Error("Task not found");
    }

    // Delete the associated task status
    await TaskStatus.findOneAndDelete({ taskId: id });

    // Return the deleted task
    return task;
  } catch (error) {
    // Throw error to be handled by controller
    throw new Error(error);
  }
};


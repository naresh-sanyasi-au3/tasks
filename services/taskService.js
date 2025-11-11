import Task from "../models/task.js";
import TaskStatus from "../models/taskStatus.js";

export const createTask = async (taskData) => {
  try {
    //Create task
    const task = await Task.create({
      name: taskData.name,
      description: taskData.description,
    });

    //Create task status
    const status = await TaskStatus.create({
      taskId: task._id,
      status: taskData.status || "Pending",
    });
    let taskResp = { ...task?.toObject(), status: status?.toObject().status };
    return taskResp;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllTasks = async () => {
  try {
    //Get task with status using lookup(two collection)
    const tasksWithStatus = await Task.aggregate([
      {
        $lookup: {
          from: "taskstatuses",
          localField: "_id",
          foreignField: "taskId",
          as: "statusInfo",
        },
      },
      {
        $unwind: {
          path: "$statusInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          id: "$_id",
          name: 1,
          description: 1,
          status: "$statusInfo.status",
          _id: 0,
        },
      },
    ]);

    return tasksWithStatus;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTask = async (id, taskData) => {
  try {
    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name: taskData.name, description: taskData.description },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    // Update task status
    let updatedStatus = null;
    if (taskData.status) {
      updatedStatus = await TaskStatus.findOne({ taskId: id });
      if (updatedStatus) {
        updatedStatus.status = taskData.status;
        await updatedStatus.save();
      }
    }
    let taskResp = updatedStatus
      ? {
          ...updatedTask?.toObject(),
          status: updatedStatus?.toObject()?.status,
        }
      : { ...updatedTask?.toObject() };
    return taskResp;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTask = async (id) => {
  try {
    // Delete task
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new Error("Task not found");
    }
    // Delete task status
    await TaskStatus.findOneAndDelete({ taskId: id });

    return task;
  } catch (error) {
    throw new Error(error);
  }
};

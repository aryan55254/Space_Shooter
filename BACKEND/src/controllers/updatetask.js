const mongoose = require("mongoose");
const tasks = require("../models/tasks");

const updatetask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      updatedtask,
      updatedduedate,
      updatedpriority,
      updateddescription,
      updatedsubtasks,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }
    const subtasksArray = Array.isArray(updatedsubtasks) ? updatedsubtasks : [];
    const updatedtasks = await tasks.findByIdAndUpdate(
      id,
      {
        ...(updatedtask && { Task: updatedtask }),
        ...(updatedduedate && { dueDate: updatedduedate }),
        ...(updatedpriority && { priority: updatedpriority }),
        ...(updateddescription && { description: updateddescription }),
        ...(updatedsubtasks && { subtasks: subtasksArray }),
      },
      { new: true }
    );

    if (!updatedtasks) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res
      .status(200)
      .json({ message: "Task updated", task: updatedtasks });
  } catch (error) {
    return res.status(500).json({ message: "Task update failed", error });
  }
};

module.exports = updatetask;

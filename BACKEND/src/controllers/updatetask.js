//update task logic
const { default: mongoose } = require("mongoose");
const tasks = require("../models/tasks");
const updatetask = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedtask } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }
    if (!id || !updatedtask) {
      return res
        .status(400)
        .json({ message: "add the content in updated task" });
    }
    const updatedtasks = await tasks.findByIdAndUpdate(
      id,
      { Task: updatedtask },
      { new: true },
      "Task completed"
    );
    if (!updatedtasks) {
      return res.status(404).json({ message: "task not found" });
    }
    return res.status(200).json({ message: "task updated" });
  } catch (error) {
    return res.status(500).json({ message: "task update failed ", error });
  }
};
module.exports = updatetask;

//update task status
const tasks = require("../models/tasks");
const mongoose = require("mongoose");
const updatetaskstatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.params;
    const iscompleted = status === "true";
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }
    const task = await tasks.findByIdAndUpdate(
      id,
      { completed: iscompleted },
      { new: true }
    );
    return res.status(200).json({ message: "task sttaus updated" });
  } catch (error) {
    res.status(500).json({ message: "task status update failed ", error });
  }
};
module.exports = updatetaskstatus;

const tasks = require("../models/tasks");
const mongoose = require("mongoose");
const gettaskbyid = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }
    const taskbyid = await tasks.findById(id, "Task completed");
    if (!taskbyid) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(taskbyid);
  } catch (error) {
    return res.status(400).json({ message: " error fetching task", error });
  }
};
module.exports = gettaskbyid;

const tasks = require("../models/tasks");

const gettaskbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const taskbyid = await tasks.findById(id);
    if (!taskbyid) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ taskbyid });
  } catch (error) {
    return res.status(400).json({ message: " error fetching task", error });
  }
};
module.exports = gettaskbyid;

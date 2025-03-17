const tasks = require("../models/tasks");

const deletetaskbystatus = async (req, res) => {
  try {
    const { status } = req.params;
    const isCompleted = status.toLowerCase() === "true";

    const deletedtasks = await tasks.deleteMany({ completed: isCompleted });

    if (deletedtasks.deletedCount == 0) {
      return res.status(404).json({ message: "No tasks found to delete" });
    }
    return res.status(200).json({ message: "selected tassk deleted " });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Couldn't delete the tasks", error });
  }
};

module.exports = deletetaskbystatus;

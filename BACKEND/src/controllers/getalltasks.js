const tasks = require("../models/tasks");

const getalltasks = async (req, res) => {
  try {
    const alltask = await tasks.find({}, "Task completed");
    return res.status(200).json({ alltask });
  } catch (error) {
    return res.status(500).json({ message: "error getting the tasks", error });
  }
};
module.exports = getalltasks;

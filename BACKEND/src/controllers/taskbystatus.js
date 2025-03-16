const tasks = require("../models/tasks");

const gettaskbystatus = async (req, res) => {
  try {
    const { status } = req.params;
    const isCompleted = status === "true";

    const taskbystatus = await tasks.find({ completed: isCompleted });

    return res.status(200).json(taskbystatus);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't get the tasks", error });
  }
};

module.exports = gettaskbystatus;

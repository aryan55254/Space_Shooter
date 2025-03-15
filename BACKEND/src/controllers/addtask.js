//add tasks logic
const tasks = require("../models/tasks");

const addtask = async (req, res) => {
  try {
    const { Task } = req.body;
    if (!Task) {
      return res.status(400).json({ message: "Task is empty" });
    }
    const newtask = new tasks({ Task });
    await newtask.save();

    return res.status(201).json({ message: "Task added", task: newtask });
  } catch (error) {
    return res.status(500).json({ message: "error happened", error });
  }
};
module.exports = addtask;

const tasks = require("../models/tasks");
const mongoose = require("mongoose");
const getfulltask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    const fulltaskbyid = await tasks.findById(id);

    if (!fulltaskbyid) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(fulltaskbyid);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching task details", error });
  }
};

module.exports = getfulltask;

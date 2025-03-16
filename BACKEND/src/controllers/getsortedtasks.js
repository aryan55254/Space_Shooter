const tasks = require("../models/tasks");

const getsortedtasks = async (req, res) => {
  try {
    const { order } = req.params;
    const sortorder = order === "asc" ? 1 : -1; //1 means oldest first  -1 is newest first
    const sortedtasks = await tasks.find().sort({ createdAt: sortorder });
    return res.status(200).json(sortedtasks);
  } catch (error) {
    return res.status(500).json({ message: "error sorting tasks", error });
  }
};
module.exports = getsortedtasks;

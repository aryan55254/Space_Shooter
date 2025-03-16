const tasks = require("../models/tasks");

const searchtask = async (req, res) => {
  try {
    const { query } = req.params;
    const matchedtasks = await tasks.find({
      Task: { $regex: query, $options: "i" },
    });
    return res.status(200).json({ matchedtasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error occured while finding task", error });
  }
};
module.exports = searchtask;

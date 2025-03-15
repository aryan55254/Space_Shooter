//delete task logic
const tasks = require("../models/tasks");

const deletetask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedtask = await tasks.findByIdAndDelete(id);
    if (!deletedtask) {
      return res.status(404).json({ message: "message not found" });
    }
    return res.status(200).json({ message: "task deleted" });
  } catch (error) {
    return res.status(500).json({ message: "error happened", error });
  }
};
module.exports = deletetask;

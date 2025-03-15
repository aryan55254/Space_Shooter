//taks
const mongoose = require("mongoose");

const tasksschema = new mongoose.Schema(
  {
    Task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const tasks = mongoose.model("tasks", tasksschema);
module.exports = tasks;

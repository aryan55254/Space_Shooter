//tasks
const mongoose = require("mongoose");
const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

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
    dueDate: { type: Date },
    priority: { type: String },
    description: {
      type: String,
    },
    subtasks: [subtaskSchema],
  },
  {
    timestamps: true,
  }
);
const tasks = mongoose.model("tasks", tasksschema);
module.exports = tasks;

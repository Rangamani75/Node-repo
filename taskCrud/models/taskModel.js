const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  isCompleted: { type: Boolean, default: false },
  completionDate: { type: Date },
  dueDate: { type: Date, required: true }
});


const taskModel = mongoose.model("Tasks",taskSchema);
module.exports = taskModel;
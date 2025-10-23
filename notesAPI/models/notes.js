const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
});

const notesModel = mongoose.model("notes",noteSchema);
module.exports = notesModel;
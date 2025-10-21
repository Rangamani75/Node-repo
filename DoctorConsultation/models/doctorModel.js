const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  isActive: { type: Boolean, default: true }
}
)

const doctorModel = mongoose.model("Doctors",doctorSchema);
module.exports = doctorModel;
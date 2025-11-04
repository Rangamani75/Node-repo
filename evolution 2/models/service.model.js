const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicleModel: { type: String, required: true },
  serviceType: { type: String, enum: ["basic", "premium", "full"], required: true },
  bookingDate: { type: Date, required: true },
  cost: { type: Number },
  status: { type: String, enum: ["booked", "completed"], default: "booked" },
  createdAt: { type: Date, default: Date.now }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = { Service };

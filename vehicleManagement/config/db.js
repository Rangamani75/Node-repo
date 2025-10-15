const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/vehicle_db");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
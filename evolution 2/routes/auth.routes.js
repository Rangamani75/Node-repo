const express = require("express");
const app = express();
require("dotenv").config();

const { connection } = require("./config/db");

app.use(express.json());
const authRoutes = require("./routes/auth.routes");
const serviceRoutes = require("./routes/service.routes");
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);

module.exports = { app, connection };

const express = require("express");
const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(express.json());
app.use("/api", vehicleRoutes);
app.use(errorHandler);

connectDB();

const PORT = 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
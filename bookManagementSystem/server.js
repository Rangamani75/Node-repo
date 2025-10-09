const express = require("express");
const app = express();

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const adminRoutes = require("./routes/adminRoutes");
const readerRoutes = require("./routes/readerRoutes");

app.use(express.json());
app.use(loggerMiddleware);

app.use("/admin", adminRoutes);
app.use("/reader", readerRoutes);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
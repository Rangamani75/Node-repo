const express = require("express");
const app = express();
const ticketRoutes = require("./routes/ticketRoutes");

app.use(express.json());

app.use("/tickets", ticketRoutes);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
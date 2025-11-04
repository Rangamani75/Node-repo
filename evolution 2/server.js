const { app, connection } = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error(err.message);
  }
});

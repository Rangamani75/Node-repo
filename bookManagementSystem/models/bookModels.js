const fs = require("fs");
const path = "./db.json";

function readBooks() {
  const data = fs.readFileSync(path, "utf-8");
  return JSON.parse(data).books || [];
}

function writeBooks(books) {
  fs.writeFileSync(path, JSON.stringify({ books }, null, 2));
}

module.exports = { readBooks, writeBooks };
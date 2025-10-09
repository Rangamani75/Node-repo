const fs = require("fs");
const path = "./db.json";

function readTickets() {
  const data = fs.readFileSync(path, "utf-8");
  return JSON.parse(data).tickets || [];
}

function writeTickets(tickets) {
  fs.writeFileSync(path, JSON.stringify({ tickets }, null, 2));
}

module.exports = { readTickets, writeTickets };
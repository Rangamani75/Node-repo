const fs = require("fs");
const path = "./data.txt";

function readFileData() {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("File does not exist. Creating new file...");
        fs.writeFile(path, "", () => {});
        return;
      } else {
        console.error(err);
        return;
      }
    }
    console.log("File Content:\n" + data);
  });
}

function appendFileData() {
  fs.appendFile(path, "\nThis is Appended data", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Appending data...");
  });
}

module.exports = { readFileData, appendFileData };

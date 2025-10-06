const { readFileData, appendFileData } = require("./fileOperations");

readFileData();

setTimeout(() => {
  appendFileData();
}, 1000);

setTimeout(() => {
  readFileData();
}, 2000);

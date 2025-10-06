import boxen from "boxen";
import chalk from "chalk";

const title = chalk.bold.bgBlue.white(" Hurray!!! ");
const message = chalk.green("I am using my first external module!");

// Classic Box
const box1 = boxen(`${title}\n${message}`, { 
  padding: 1, 
  margin: 1, 
  borderStyle: "classic",
  borderColor: "green"
});

// SingleDouble Box
const box2 = boxen(`${title}\n${message}`, { 
  padding: 1, 
  margin: 1, 
  borderStyle: "singleDouble", 
  borderColor: "yellow"
});

// Round Box
const box3 = boxen(`${title}\n${message}`, { 
  padding: 1, 
  margin: 1, 
  borderStyle: "round",
  borderColor: "blue"
});

console.log(box1);
console.log(box2);
console.log(box3);

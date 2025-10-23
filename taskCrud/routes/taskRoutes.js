const express = require("express");
const mongoose = require("mongoose");
const { getTask, addTask, updateTask, deleteTasksByPriority } = require("../controllers/taskcontrollers");
const { validateTaskData } = require("../middleware/datacheckware");
let taskRouter = express.Router();
taskRouter.get("/",getTask)
taskRouter.post("/addTask",validateTaskData, addTask)
taskRouter.patch("/updateTask/:id",validateTaskData,updateTask)
taskRouter.delete("/deleteTask",deleteTasksByPriority);
module.exports = taskRouter;
const express = require("express")
const addTaskController = require("../controllers/task.controller")
const taskRouter = express.Router()
taskRouter.post("/",addTaskController)
taskRouter.get("/getting",allTasks)
module.exports = taskRouter


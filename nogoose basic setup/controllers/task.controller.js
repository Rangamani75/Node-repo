const taskModel = require("../models/task.model");

 async function addTaskController(req,res) {
    try {
        await taskModel.create(req.body)
        res.json({msg:"task added seccssfully"})
    } catch (error) {
       res.json({msg:"something went wrong"})
        
    }
    
 }
 async function allTasks(params) {
    
 }
 module.exports = addTaskController
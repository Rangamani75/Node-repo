const express = require("express")
const app = express()
const connect = require("./configs/mongo.config")
const taskRouter = require("./routes/task.route")
app.use(express.json())
app.use("/tasks",taskRouter)


connect().then(()=>{
 app.listen(3000,()=>{
    console.log("listening to port 3000")
})
})


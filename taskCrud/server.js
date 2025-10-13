const express = require("express");
const mongoose = require("mongoose");
const connectToDB = require("./config/db");
const taskRouter = require("./routes/taskRoutes");
const app = express();
connectToDB();
app.use(express.json());
app.use("/test",(req,res)=>{
	res.status(200).json({msg:"App is testing!"});
})
app.use("/tasks",taskRouter)
app.use((req,res)=>{
	res.status(404).json({Error:"Rouet is not defined"});
})

app.listen(7000,()=>{
	console.log("App is running on the port 7000");
})
const mongoose = require("mongoose");
const express = require("express");
const connectToDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const app = express();
app.use(express.json());
connectToDB()

app.get("/test",(req,res)=>{
	res.status(200).json({message:"App is teking"});

})

app.use("/api",userRouter);


app.use((req,res)=>{
	res.status(404).json({Error:"Route is not defined!!1"});
})

app.listen(7000,()=>{
	console.log("App is working on the route 7000")
})
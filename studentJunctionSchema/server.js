const mongoose = require("mongoose");
const express = require("express");
const connectToDB = require("./configs/db");
const studentRouter = require("./routes/studentRoute");
const courseRouter = require("./routes/courseRoute");
const enrollRouter = require("./routes/enrollRoute");
const app = express();
app.use(express.json());
connectToDB()

app.get("/test",(req,res)=>{
	res.status(200).json({message:"App is teking"});

})



app.use("/Students",studentRouter);
app.use("/Courses",courseRouter);
app.use("/Enrolls",enrollRouter);



app.use((req,res)=>{
	res.status(404).json({Error:"Route is not defined!!1"});
})

app.listen(7000,()=>{
	console.log("App is working on the route 7000")
})
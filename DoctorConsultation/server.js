const mongoose = require("mongoose");
const express = require("express");
const connectToDB = require("./configs/db");
const doctorRouter = require("./routes/doctorRoutes");
const patientRouter = require("./routes/patientRouter");
const consultationRouter = require("./routes/consultationRouter");
const app = express();
app.use(express.json());
connectToDB()

app.get("/test",(req,res)=>{
	res.status(200).json({message:"App is teking"});

})
app.use("/doctors",doctorRouter);
app.use("/patients",patientRouter);
app.use("/consultations",consultationRouter)

app.use((req,res)=>{
	res.status(404).json({Error:"Route is not definedyet"});
})

app.listen(7000,()=>{
	console.log("App is working on the route 7000")
})
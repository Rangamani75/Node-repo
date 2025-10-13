const mongoose = require("mongoose");
const express = require("express");
const connectToDb = require("./configs/db");
const router = require("./routes/library.routes");

const app = express();
app.use(express.json());
app.get("/test",(req,res)=>{
	res.status(200).json({message:"Test Route is working!!"});
})
connectToDb()
app.use((req,res)=>{
	res.status(404).json({Error:"Route Not found,path is Invalid"})
})

app.use("/library",router)

app.listen(8080,()=>{
	console.log("App is working on the port 7000");
})
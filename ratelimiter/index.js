const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const apiRouter = require("./routes/api");


app.use(express.json());
app.use("/test",(req,res)=>{
	res.json("App test is working !!!!")
})
app.use("/api",apiRouter)
app.use((req,res)=>{
	res.status(404).json({"error":"404 Not Found"});
})
app.listen(7000,()=>{
	console.log("Ratelimit on 7000")
})
const express = require("express");
const connectToDb = require("./Configs/mongoDB.config");
const todoRouter = require("./routes/todoRoutes");

connectToDb();
const app = express();
app.use(express.json());
app.use("/test",(req,res)=>{
	res.status(200).json({msg:"App is testing and working"});

})
app.use("/todos",todoRouter)

app.listen(7000,()=>{
	console.log("App is working on the Port 7000")
})
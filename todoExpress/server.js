const express = require("express");
const app = express();
app.use(express.json());
const todoRoutes = require("./routes/todoRouter");

app.use("/todos",todoRoutes);

app.get("/test",(req,res)=>{
	res.status(200).json({"msg":"App is working on test"});
})

app.use((req,res)=>{
	res.json({msg:"route 404 Not Found"})
})


app.listen(7700,()=>{
	console.log("App is working on the Port 7700")
})
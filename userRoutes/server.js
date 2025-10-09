const express = require("express");
const app = express();
app.use(express.json());

app.get("/test",(req,res)=>{
	res.status(200).json({msg:"App is working"})
})


app.get("/users/get", (req, res) => {
  res.status(200).json({ "id": 1, "name": "John Doe", "email": "john@example.com" });
});


app.get("/users/list", (req, res) => {
  res.status(200).json([
    { "id": 1, "name": "John Doe", "email": "john@example.com" },
    { "id": 2, "name": "Jane Doe", "email": "jane@example.com" },
    { "id": 3, "name": "Bob Smith", "email": "bob@example.com" }
  ]);
});

app.listen(7000,()=>{
	console.log("APP IS WORKING ON THE PORT 7000")
})
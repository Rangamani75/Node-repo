const express = require("express")
const app = express()
app.get("/home",(req,res)=>{
    res.send("Welcome to Home Page")
})
app.get("/aboutus",(req,res)=>{
    res.json({ "message": "Welcome to About Us" })
})
app.get("/contactus",(req,res)=>{
    res.send("63562698")
})
app.use((req, res) => {
  res.status(404).send('Page not found');
});


app.listen(3000,()=>{
    console.log(" listen http://localhost:3000")
})
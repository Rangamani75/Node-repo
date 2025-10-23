const express = require("express")
const app = express()
app.get("/ranga",(req,res)=>
    
    {
        console.log("Hy mani")
        res.send("Hey ranga page visited")
        console.log("Hy mani")
    } 
)
app.get("/home",(req,res)=> res.send("Hey home page visited")
)
app.get("/contact",(req,res)=> res.send("Hey contact page visited")
)
app.use(express.json())
app.post("/add-data",(req,res)=>{
    console.log(req.body)
    res.send("succssfully added the data")

})
app.put("/updatedata",(req,res)=>
    {res.send("Data updated....")})
app.delete("/deletedata",(req,res)=>{
    res.send("Data deleted....")})
app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");

})
const express = require("express")
const app = express()
let courseRoutes = require("./route/courseRouter")
app.use("/coursesr",courseRoutes)
app.get("/test",(req,res)=>{
    res.send("testing suuccc")
})
app.listen(7000,()=>{
 console.log("Server running on http://localhost:7000");
})

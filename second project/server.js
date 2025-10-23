const express = require("express")
const fs = require("fs")
const courseRoutes = require("../routes/courseRouter")
const app = express()
app.use(express.json())
app.get("/test", (req,res)=>{
     res.json({msg:"this is the test page visiting"})
})
app.get("/all-course",(req,res)=>{
    let data = JSON.parse(fs.readFileSync("db.json","utf-8"))
    let x = data.courses
    res.json({msg:"list of all courses"})
})
app.use(express.json())
app.post("/add-course",(req,res)=>{
    let newcourse = req.body
    let data = JSON.parse(fs.readFileSync("db.json","utf-8"))
    data.courses.push(newcourse)
    fs.writeFileSync("./db.json", JSON.stringify(data));

    
    
    res.json({msg:"added succssfully"})

})
app.put("/update/:id",(req,res)=>{
    let id = req.params.id 
    let updatedcourse = req.body
     let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
     let courses = data.courses
     let index = courses.findIndex(course => course.id == id);
     if(index===-1){
       return res.json({msg:"index not found"})
     }
     let updatedCourses = courses.map((ele,i)=>{
        if(ele.id==id){
            return {...ele , ...updatedcourse}
        }
        else{
            return ele
        }
     })
     data.courses=updatedCourses
     fs.writeFileSync("./db.json", JSON.stringify(data));
    
   

    res.send("successfully updated")

})
app.delete("/delete/:id",(req,res)=>{
    let id = req.params.id 
   let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
   courses = data.courses 
//    console.log(courses)
   let index = courses.findIndex((course)=> course.id==id )
   if(index===-1){
    return res.json({msg:"index not found"})

   }
   
   else{
     courses.splice(index, 1);

  // Save updated data
  data.courses = courses;
  fs.writeFileSync("./db.json", JSON.stringify(data)); 
   }
  
    res.json({msg:"deleted succeesfully"})

})
app.get("/course",(req,res)=>{
    console.log(req.query)
    res.status(700).json("succefully gained the data")
})



app.use("/coursesr",courseRoutes)


app.listen(5000,()=>{
    console.log("Server running on http://localhost:5000");


})
const express = require("express")
const courseRoutes = express.Router()
const fs = require("fs")

const {getData,addOrUpdate} = require("../models/courseModel")
const { getAllCourses } = require("../controller/courseController")

courseRoutes.use(express.json())
courseRoutes.get("/test", (req,res)=>{
     res.json({msg:"this is the test page visiting"})
})
courseRoutes.get("/all-course",getAllCourses)
courseRoutes.use(express.json())
courseRoutes.post("/add-course",(req,res)=>{
    let newcourse = req.body
   let { data } = getData();
  data.courses.push(newcourse);
    addOrUpdate(data)

    
    
    res.json({msg:"added succssfully"})

})
courseRoutes.put("/update/:id",(req,res)=>{
    let id = req.params.id 
    let updatedcourse = req.body
     let data = getData().data
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
     addOrUpdate(data)
    
   

    res.send("successfully updated")

})
courseRoutes.delete("/delete/:id",(req,res)=>{
    let id = req.params.id 
   let data = getData().data
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
   addOrUpdate(data)
   }
  
    res.json({msg:"deleted succeesfully"})

})
courseRoutes.get("/course",(req,res)=>{
    console.log(req.query)
    res.status(700).json("succefully gained the data")
})



// courseRoutes.listen(7000,()=>{
//     console.log("Server running on http://localhost:7000");


// })

module.exports = courseRoutes
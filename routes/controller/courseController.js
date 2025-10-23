const { getData } = require("../models/courseModel")

 
  
  const getAllCourses = (req,res)=>{
     let courses = getData().courses
    console.log(courses)
    res.send("list of all courses")
  }
  module.exports = {getAllCourses}

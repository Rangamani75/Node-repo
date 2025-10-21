const mongoose = require("mongoose");
const courseModel = require("../models/courseModel");
const enrollModel = require("../models/enrollModel");
const addCourse = async(req,res)=>{
	try{
		let course = await courseModel.create(req.body);
		res.status(201).json({message:"Cousre is added Successfull",course})

	}
	catch(err){
		res.status(404).json({Error:"Error occured in adding a Course",err})
	}
}

const deletecourse = async(req,res)=>{
	try{
         
		const stuId = req.params.id;
		let course = await courseModel.findById(stuId);
		if(!course){
			res.status(404).json({Message:"course Not found"});

		}
		if(!course.isActive){
			res.status(404).json({Message:"course is already Deleted!1"});
		}
		course.isActive = false;
		
		await course.save();
		await enrollModel.updateMany(
  { courseId: stuId },
  { $set: { isActive: false } }
);


		    res.json({ Message: "course and related enrollments deleted successfully" });


	}
	catch(err){
		res.status(404).json({Error:"Something error happened in deleting the course",message:err.message})
	}
}

const getActiveStudentsofCourse = async(req,res)=>{
	try{

		let sid = req.params.id;
		let course = await courseModel.findById(sid);
		if(!course){
			res.status(404).json({Error:"courset ID is not valid"});

		}
		if(!course.isActive){
			res.status(404).json({Error:"course is not active,deleted"});
		}
		let Students = await enrollModel.find({"courseId":sid,isActive:true}).populate("studentId");
		res.status(200).json({Message:"Active Students of the course",Students});
		

	}
	catch(err){
		res.status(404).json({Error:"Error occured in getting the active Students of the students",message:err.message});
	}
}



module.exports={
	addCourse,deletecourse,getActiveStudentsofCourse
}
const mongoose = require("mongoose");
const studentModel = require("../models/studentModel");
const enrollModel = require("../models/enrollModel");
const addstudent = async(req,res)=>{
	try{
		let student = await studentModel.create(req.body);
		res.status(201).json({message:"Cousre is added Successfull",student})

	}
	catch(err){
		res.status(404).json({Error:"Error occured in adding a student",err})
	}
}
const deleteStudent = async(req,res)=>{
	try{
         
		const stuId = req.params.id;
		let student = await studentModel.findById(stuId);
		if(!student){
			res.status(404).json({Message:"Student Not found"});

		}
		if(!student.isActive){
			res.status(404).json({Message:"Student is already Deleted!1"});
		}
		student.isActive = false;
		
		await student.save();
		await enrollModel.updateMany(
  { studentId: stuId },
  { $set: { isActive: false } }
);


		    res.json({ Message: "Student and related enrollments deleted successfully" });


	}
	catch(err){
		res.status(404).json({Error:"Something error happened in deleting the student",message:err.message})
	}
}


const getActiveCoursesofStudent = async(req,res)=>{
	try{

		let sid = req.params.id;
		let student = await studentModel.findById(sid);
		if(!student){
			res.status(404).json({Error:"student ID is not valid"});

		}
		if(!student.isActive){
			res.status(404).json({Error:"Student is not active,deleted"});
		}
		let courses = await enrollModel.find({"studentId":sid,isActive:true}).populate("courseId");
		res.status(200).json({Message:"Active Courses of the student",courses});
		

	}
	catch(err){
		res.status(404).json({Error:"Error occured in getting the active courses of the students",message:err.message});
	}
}


module.exports={
	addstudent,deleteStudent,getActiveCoursesofStudent
}
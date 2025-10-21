const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
	studentId:{type:mongoose.Schema.Types.ObjectId,ref:"Students"},
	courseId:{type:mongoose.Schema.Types.ObjectId,ref:"Courses"},
	enrolledAt:{type:Date,default:Date.now()},
	isActive:{type:Boolean,default:true}
})


const enrollModel = mongoose.model("Enrollment",enrollmentSchema);
module.exports = enrollModel;
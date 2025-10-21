
const mongoose = require("mongoose");
const consultationSchema = new mongoose.Schema({
	doctorId:{type:mongoose.Schema.Types.ObjectId,ref:"Doctors"},
	patientId:{type:mongoose.Schema.Types.ObjectId,ref:"Patients"},
	consultedAt:{type:Date,default:Date.now()},
	notes:String,
	isActive:{type:Boolean,default:true}
})

const consultationModel = mongoose.model("Consultation",consultationSchema);
module.exports=consultationModel;
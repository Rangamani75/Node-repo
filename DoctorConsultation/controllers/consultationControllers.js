
const mongoose = require("mongoose");
const consultationModel = require("../models/consultationModel");
const patientModel = require("../models/patientModel");


const addConsultation = async(req,res)=>{
	try{
        
       const {doctorId,patientId} = req.body;
	   let doctor = await doctorModel.findById(doctorId);
	   if(!doctor){
		return res.status(404).json({Error:"Doctor id is not valid"});
	   }
	   if(!doctor.isActive){
		return res.status(404).json({Error:"Doctor is not active, cannot add in the consultaion"});

	   }
          
	   let patient = await patientModel.findById(patientId);
	   if(!patient){
		return res.status(404).json({Error:"patient id is not valid"});
	   }
	   if(!patient.isActive){
		return res.status(404).json({Error:"patient is not active, cannot add in the consultaion"});

	   }
	   if(!doctor){
		return res.status(404).json({Error:"Doctor id is not valid"});
	   }
	   if(!doctor.isActive){
		return res.status(404).json({Error:"Doctor is not active, cannot add in the consultaion"});

	   }
	   let consultation = await consultationModel.create(req.body);
	   res.status(201).json({Message:"Consultaion added "});

	}
	catch(err){
		res.status(404).json({Error:"Something error occured in adidng the consultation",message:err.message});

	}
}




const getDoctorConsultationCount = async (req, res) => {
  try {
    const count = await consultationModel.countDocuments({
      doctorId: req.params.id,
      isActive: true
    });
    res.json({ totalConsultations: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
	addConsultation,
	getDoctorConsultationCount
}
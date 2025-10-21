const mongoose = require("mongoose");
const doctorModel = require("../models/doctorModel");
const consultationModel = require("../models/consultationModel");



const adddoctor = async(req,res)=>{
	try{
        
		let doctor = await doctorModel.create(req.body);
		res.status(201).json({message:"doctor added",doctor});

	}
	catch(err){
		res.status(404).json({Error:"Something error occured in adidng the doctor",message:err.message});

	}
}


const getDoctorPatients = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const consultations = await consultationModel.find({
      doctorId: req.params.id,
      isActive: true
    })
      .populate("patientId", "-__v")
      .select("patientId consultedAt -_id")
      .sort({ consultedAt: -1 })
      .limit(limit);

    res.json(consultations.map(c => c.patientId).filter(Boolean));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
	adddoctor,
	getDoctorPatients,
}
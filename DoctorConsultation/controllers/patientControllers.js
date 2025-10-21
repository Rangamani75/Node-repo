const mongoose = require("mongoose");
const patientModel = require("../models/patientModel");
const consultationModel = require("../models/consultationModel");



const addpatient = async(req,res)=>{
	try{
        
		let patient = await patientModel.create(req.body);
		res.status(201).json({message:"patient added",patient});

	}
	catch(err){
		res.status(404).json({Error:"Something error occured in adidng the patient",message:err.message});

	}
}
const getPatientDoctors = async (req, res) => {
  try {
    const consultations = await consultationModel.find({
      patientId: req.params.id,
      isActive: true
    })
      .populate("doctorId", "-__v")
      .select("doctorId consultedAt -_id");

    res.json(consultations.map(c => c.doctorId).filter(Boolean));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPatientsByGender = async (req, res) => {
  try {
    const patients = await Patient.find({
      gender: req.query.gender,
      isActive: true
    });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
	addpatient,
	getPatientDoctors,
	getPatientsByGender,

}
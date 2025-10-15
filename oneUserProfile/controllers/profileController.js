
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const profileModel = require("../models/profileModel");


const addProfile = async(req,res)=>{
	//const {userId} = req.params;
	try{

		// let user = await userModel.findById(userId);
		// if(!user){
		// 	return res.status(500).json({Error:"USer not found and is not valid id"});

		// }

		let profile = await profileModel.create(req.body);
		res.status(201).json({message:"Profoile added ",profile});


	}
	catch(err){
		res.status(402).json({error:"Error in adding profile to the user"});
	}
}


const getProfiles = async(req,res)=>{
	try{
         let profiles =  await profileModel.find().populate("user");
		 res.status(200).json({message:"Propfiles",profiles})
	}
	catch(err){
		res.status(404).json({Error:"Error in printing all profiles",err})
	}
}

module.exports = {
	addProfile,getProfiles
}
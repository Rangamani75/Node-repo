const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const addUser = async(req,res)=>{
	try{
		let user =  await userModel.create(req.body) ;
		res.status(201).json({message:"user created Successfully",user});   

	}
	catch(err){
		res.status(404).json({Error:"Error in dding the user",err});
	}
}
 
module.exports = {
	addUser,
}
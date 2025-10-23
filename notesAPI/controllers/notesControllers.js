const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const notesModel = require("../models/notes");


const addPost = async(req,res)=>{
	try{
                let post = await notesModel.create(req.body);
				res.status(201).json({Message:"Notes Added Successfull",post})
	}
	catch(err){
		res.status(404).json({Error:"Error in adding notes",error:err.message});
	}
}





module.exports={
	addPost,
}
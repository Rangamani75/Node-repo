const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const signUp = async(req,res)=>{

	try{
          const {name,email,password} = req.body;
		  bcrypt.hash(password, saltRounds, async function(err, hash) {
			if(err){
				return res.status(404).json({Error:"Error in cretaing user"});
			}
			else{
				let user = await userModel.create({name,email,password:hash});
				console.log(user)
				return res.status(201).json({Message:"USer is cretaed"});
			}
    
});

	}
	catch(err){
		res.status(404).json({Error:"Error is cretaing a user!",Error:err.message});
	}
}

const login = async(req,res)=>{
	try{
				const {name,email,password} = req.body;
		let user =  await userModel.findOne({email});
		if(!user){
			return res.status(404).json({Error:"User is not a valid user"})
		}
		let hash = user.password;
		bcrypt.compare(password, hash,async function(err, result) {
		if(err){
			return res.status(404).json({Error:"Error in lohgin",errr:err.message});
		}
		else{
			if(result==true){
				var token = jwt.sign({userId:user._id }, 'shhhhh');
				res.status(200).json({Message:"Login Success",token});

			}
		}
});

          
	}
	catch(err){
		res.status(404).json({Error:"Error in logging the suer",errr:err.message});
	}
}


module.exports={
	signUp,login
}
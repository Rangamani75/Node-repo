const express = require("express");
const userRouter = express.Router();
require("dotenv").config();
const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
userRouter.post("/signUp",async(req,res)=>{

	try{
        const {name,email,password} = req.body;
		bcrypt.hash(password, saltRounds, async function(err, hash) {
    if(err){
		res.status(404).json({Error:"Error occured in signup",err});
	}else{
		let user= await userModel.create({name,email,password:hash});
		 console.log(user)
         res.status(201).json({Message:"User created"});
	
	}
});

	}
	catch(err){
          res.status(404).json({Error:"Something error occured",Err:err.message})
	}

})




userRouter.post("/login",async (req,res)=>{
	try{
		const {name,email,password} = req.body;
		console.log(process.env.secret_key);
		let user = await userModel.findOne({email});
		if(!user){
			return res.status(404).json({Error:"USer has not registered, "});
		}else{
			let hash = user.password;
			bcrypt.compare(password,hash).then(function (result){
				if(result==true){
					var token = jwt.sign({userId:user._id},process.env.secret_key);

					return res.status(200).json({Message:"Login Successs",token});
				}else{
					res.status(404).json({ErrorL:"Wrong Password,Try Again!"});
				}
			})
		}

	}
	catch(err){
		res.status(400).json({Error:"Error in Logging the user",Err:err.message})	}
})



module.exports = userRouter;
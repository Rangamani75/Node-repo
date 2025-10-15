const mongoose = require("mongoose");
const validator = require("validator");
const express = require("express");

const profileSchema = new mongoose.Schema({
	profileName:{type:String,enum:["fb", "twitter", "github", "instagram"],required:true},
	url:{ type: String,
    required: true,
    validate: {
      validator: (val) => validator.isURL(val),
      message: "Invalid URL",
    },}
})


const userSchema = new mongoose.Schema({
	name:{type:String,required:true},
	email:{type:String,required:true,unique:true},
	password:{type:String,required:true, minlength: [6, "Password must be at least 6 characters"]},
	profiles:[profileSchema]
})


const profileModel = mongoose.model("userProfiles",userSchema);
module.exports = profileModel;
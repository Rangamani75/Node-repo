const mongoose = require ("mongoose");
const addressSchema = new mongoose.Schema({
	street:String,city:String,
	state:String,country:{type:String,default:"India"},
	pincode:Number,
})
const userSchema = new mongoose.Schema({
	name:{
		type:String,
	},
	email:String,age:Number,
	addresses:[addressSchema]
})




const userModel =  mongoose.model("users",userSchema);
module.exports = userModel;
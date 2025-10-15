const mongoose =require("mongoose");


const profileSchema = new mongoose.Schema({
	bio:String,
	SocialMediaLinks:[{type:String}],
	user:{type:mongoose.Schema.Types.ObjectId,ref:"users", required: true,
    unique: true},
 })


 const profileModel = mongoose.model("profiles",profileSchema);
 module.exports = profileModel;
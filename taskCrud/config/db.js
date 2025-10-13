const mongoose = require("mongoose");

let connectToDB = async()=>{
	try{
		await mongoose.connect("mongodb://127.0.0.1:27017/task")
		console.log("Connected to the Task Database");
	}catch(err){
		console.log("Something error is occured while connecting to database",err)
	}
}

module.exports = connectToDB;
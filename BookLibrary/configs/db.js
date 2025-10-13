const mongoose = require("mongoose");

const connectToDb = async()=>{
	try{
		await mongoose.connect("mongodb://127.0.0.1:27017/bookLibrary")
		console.log("Connected to bookLibrary Database")
	}
	catch(err){
		console.log("Error in connecting to database",err)
	}
}

module.exports=connectToDb;
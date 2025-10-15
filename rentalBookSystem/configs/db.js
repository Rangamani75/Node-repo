

//db.js
const mongoose = require("mongoose");

const connectToDB = async()=>{
	try{
		await mongoose.connect("mongodb://127.0.0.1:27017/BookRental")
		console.log("Connected to BookRental database");
	}
	catch(err){
		console.log("Something error in database connection",err);
	}
}

module.exports = connectToDB;
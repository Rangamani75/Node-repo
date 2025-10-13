const mongoose = require("mongoose");
async function connectToDb (){
         try{
          await mongoose.connect("mongodb://127.0.0.1:27017/ToDo")
		  console.log("Connected To Db");
		 }
		 catch(err){
			console.log("Something went wrong",err);
		 }
		 
}

module.exports = connectToDb;
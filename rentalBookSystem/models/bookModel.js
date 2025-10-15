const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
	title:{type:String,required:true,minlength:3},
	author:{type:String,required:true},
	genre:String,
	rentedBy:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}]
})


const bookModel = mongoose.model("books",bookSchema);
module.exports = bookModel;
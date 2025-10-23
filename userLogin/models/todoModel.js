const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	title:String,
	status:Boolean
})

const todoModel = mongoose.model("todos",todoSchema);
module.exports = todoModel;
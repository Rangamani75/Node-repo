const express = require("express");
//const mongoose= require("mongoose");
const todoModel = require("../models/todoModel");
const todoRouter = express.Router();
todoRouter.get("/", async (req, res) => {
  try {
    let todos = await todoModel.find({});
    if (todos.length === 0) {
      res.status(200).json({ msg: "No data available, please add" });
    } else {
      res.status(200).json({ msg: "Here is the data", todos });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error occurred", error: err.message });
  }
});

todoRouter.post("/addTodo",async(req,res)=>{
try{
		let todo = await todoModel.create(req.body);
		res.status(201).json({message:"Todo is added",todo})


}catch(err){
	res.status(500).json({Error:"Something went wrong",err})
}
})

todoRouter.patch("/updateTodo/:id",async(req,res)=>{
	try{
	const {id} = req.params;
	const todo = await todoModel.findById(id);
	if(!todo){
		res.status(500).json({msg:"Id is not valid"})

	}
	await todoModel.findByIdAndUpdate(id,req.body);
	res.status(202).json({msg:"Todo updated suceessfilly"});
}catch(err){
	res.status(404).json({msg:"Something went wrong",err})
}
})

todoRouter.delete("/deleteTodo/:id",async(req,res)=>{
	try{
	const {id} = req.params;
	const todo = await todoModel.findById(id);
	if(!todo){
		res.status(500).json({msg:"Id is not valid"})

	}
	await todoModel.findByIdAndDelete(id);
	res.status(202).json({msg:"Todo Deleted  suceessfilly"});
}catch(err){
	res.status(404).json({msg:"Something went wrong",err})
}
})





module.exports = todoRouter;
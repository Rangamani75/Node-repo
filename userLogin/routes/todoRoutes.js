const express = require("express");
const todoRouter = express.Router();
var jwt = require('jsonwebtoken');
const todoModel = require("../models/todoModel");
const authMiddleware = require("../middleware/authmiddleware");
todoRouter.post("/addTodo",authMiddleware,async(req,res)=>{
	try{
 let todo = await todoModel.create(req.body);
 res.status(200).json({Messgae:"Todo Added",todo});
	}
	catch(err){
		res.status(404).json({Error:"Something error in adding todo",errr:err.message});
	}

})

module.exports =  todoRouter;
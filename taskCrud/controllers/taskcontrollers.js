const mongoose = require("mongoose");
const taskModel = require("../models/taskModel");


const addTask = async(req,res)=>{
	try{
      let task = await taskModel.create(req.body);
	  res.status(201).json({msg:"Task is created Successfully",task});
	}
	catch(err){
		res.status(404).json({error:"Something error occured in adding a Task",err})
	}
}

const getTask = async(req,res)=>{
	try{
     let users = await taskModel.find({});
	 if(users.length==0) res.status(500).json({err:"No tasks available right now"})
	res.status(200).json({msg:"Here are tasks",users});

	}catch(err){
		res.status(500).json({Error:"Something went wrong in fetchoing tasks",err})
	}
}
const updateTask = async(req,res)=>{
	try{
      
		let task =  await taskModel.findById(req.params.id);
		if(!task) res.status(404).json({msg:"Not a valid taskid"});
		else{
		let updatedTask = req.body;
if (updatedTask.isCompleted === true) {
  updatedTask.completionDate = new Date();  // ensures correct type
}
		await taskModel.findByIdAndUpdate(req.params.id,updatedTask,{new:true});
		res.status(200).json({msg:"TAsk is upadted "})
	}

	}catch(err){
		res.status(404).json({msg:"Something went wrong",err})
	}
}


// DELETE /tasks?priority=low
const deleteTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.query;

    if (!priority) {
      return res.status(400).json({ msg: "Priority filter is required to delete tasks." });
    }

    const result = await taskModel.deleteMany({ priority });

    res.status(200).json({
      msg: `${result.deletedCount} task(s) with priority '${priority}' deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};




module.exports ={
	addTask,getTask,updateTask,deleteTasksByPriority
}
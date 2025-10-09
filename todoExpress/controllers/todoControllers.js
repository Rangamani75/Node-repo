const express = require("express");
const { getData, addorUpdateData } = require("../models/todoModel.js");
 const getAllTodos =(req,res)=>{
	let data = getData();
	let todos =  getData().todos;
res.status(200).json({"msg":"Data is heere",todos});

 }

const addTask = (req,res)=>{
	const {data,todos} = getData();
	//console.log(todos)
	let newTask = req.body
let idx = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
	let item = {...newTask,id:idx}
	todos.push(item);
	addorUpdateData(data);
	res.status(200).json({"msg":"New Task is added",data});

}

const updateTask = (req,res)=>{
	let {data,todos}=getData();
	let id = req.params.id;
	let updatedTask = req.body;
	let found=false;
	let upItems = todos.map((ele)=>{
          if(ele.id==id){
			found=true;
			return {...ele,...updatedTask}
		  }else{
			return ele;
		  }
	})
	data.todos = upItems;
    addorUpdateData(data)
	if(found) res.status(200).json({"msg:":"Taska are Updated",data})
	else res.status(404).json({"msg:":"Id not found"});
}

const deleteTask=(req,res)=>{
	let id = req.params.id;
	let {data,todos} = getData();
	let found = false;
	let updatedData = todos.filter((el)=>{
		if(el.id==id){
			found=true;
		}
		return el.id!=id;
	})

	data.todos = updatedData;
	addorUpdateData(data);
	if(!found) res.status(404).json({msg:"ID Not Found"});
	res.status(200).json({"msg:":"Item is deleted",data});

}

const searchTitle = (req,res)=>{
	let query = req.query.title;
	let {data,todos} = getData();
	//console.log(title)
	let searched  = todos.filter((el)=>{
		return el.title.toLowerCase().includes(query.toLowerCase());
})
	if(searched.length==0) res.status(404).json({msg:"Title is not matched"});
	res.status(200).json({msg:"Matched data is here",searched})


}



 module.exports = {
	getAllTodos,addTask,updateTask,deleteTask,searchTitle
 }
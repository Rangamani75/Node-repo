const express = require("express");
const fs = require("fs");
const { getAllTodos, addTask, updateTask, deleteTask, searchTitle } = require("../controllers/todoController");

const todoRoutes = express.Router();

todoRoutes.get("/all-todos",getAllTodos);
todoRoutes.post("/addTodo",addTask);
todoRoutes.put("/updateTask/:id",updateTask);
todoRoutes.delete("/deleteTask/:id",deleteTask);
todoRoutes.get("/searchTitle",searchTitle)
module.exports = todoRoutes;
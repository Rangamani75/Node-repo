const express = require("express");
const mongoose = require("mongoose");
const { addUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/addUser",addUser);

module.exports = userRouter;
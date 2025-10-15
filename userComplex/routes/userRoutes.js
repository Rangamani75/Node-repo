const mongoose = require("mongoose");
const express = require("express");
const { addUser, addAddress, getUserSummary, getUserDetails, deleteAddress } = require("../controllers/userController");

const userRouter = express.Router();
userRouter.post("/users/addUser",addUser);
userRouter.post("/users/:userId/address", addAddress);
userRouter.get("/users/summary", getUserSummary);
userRouter.get("/users/:userId", getUserDetails);
userRouter.delete("/users/:userId/address/:addressId", deleteAddress); 

module.exports = userRouter;
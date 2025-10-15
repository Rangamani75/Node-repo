const express = require("express");
const { getAllUsers, addUser, rentBook, returnBook, userRentals } = require("../controllers/userController");

const userRouter = express.Router();
userRouter.get("/getAllUsers",getAllUsers);
userRouter.post("/addUser",addUser);
userRouter.post("/rentBook/:userId",rentBook);
userRouter.post("/returnBook/:userId",returnBook);
userRouter.get("/userRentals/:userId",userRentals);
module.exports = userRouter;
const mongoose = require("mongoose");
const express = require("express");
const { addUser, getUsers, addProfilebyUserId, searchUserandProfile, updateProfileNameByUserId, deleteProfilenameByUserId } = require("../controllers/profileController");

const profileRouter = express.Router();
profileRouter.post("/addUser",addUser);
profileRouter.get("/getUsers",getUsers);
profileRouter.post("/addProfilebyUserId/:userId",addProfilebyUserId)
profileRouter.get("/search",searchUserandProfile)
profileRouter.delete("/delete/:userId/:profileName",deleteProfilenameByUserId);
profileRouter.put("/updateProfile/:userId/:profileName",updateProfileNameByUserId)
module.exports = profileRouter;
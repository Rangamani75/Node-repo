
const express = require("express");
const mongoose = require("mongoose");
const { addProfile, getProfiles } = require("../controllers/profileController");

const profileRouter = express.Router();

profileRouter.post("/addProfile",addProfile);
profileRouter.get("/getProfiles",getProfiles)
module.exports = profileRouter;
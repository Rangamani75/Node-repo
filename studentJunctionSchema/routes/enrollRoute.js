const express = require("express");
const { addenroll } = require("../controllers/enrollController");

const enrollRouter = express.Router();
enrollRouter.post("/addEnroll",addenroll)

module.exports = enrollRouter;
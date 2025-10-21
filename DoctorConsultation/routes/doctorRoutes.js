const express = require("express");
const { adddoctor } = require("../controllers/doctorControllers");

const doctorRouter = express.Router();
doctorRouter.post("/addDoctor",adddoctor)

module.exports = doctorRouter;
const express = require("express");
const { addpatient } = require("../controllers/patientControllers");

const patientRouter = express.Router();
patientRouter.post("/addPatient",addpatient)

module.exports = patientRouter;
const express = require("express");
const { addConsultation } = require("../controllers/consultationControllers");
const consultationRouter = express.Router();
consultationRouter.post("/addConsultation",addConsultation)

module.exports = consultationRouter;
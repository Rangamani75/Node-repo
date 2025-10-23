const express = require("express");
// const { addPost } = require("../controllers/notesControllers");
const authMiddleware = require("../middleware/authMiddleWare");
const { addPost } = require("../controllers/notescontrollers");
const notesRouter = express.Router();
notesRouter.post("/addNotes",authMiddleware, addPost);
module.exports = notesRouter
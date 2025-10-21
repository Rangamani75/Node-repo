const express = require("express");
const { addstudent, deleteStudent, getActiveCoursesofStudent } = require("../controllers/studentController");

const studentRouter = express.Router();
studentRouter.post("/addStudent",addstudent);
studentRouter.delete("/deleteStudent/:id",deleteStudent)
studentRouter.get("/activeCourses/:id",getActiveCoursesofStudent);
module.exports = studentRouter;
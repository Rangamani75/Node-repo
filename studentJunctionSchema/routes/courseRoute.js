const express = require("express");
const { addCourse, deletecourse, getActiveStudentsofCourse } = require("../controllers/courseController");

const courseRouter = express.Router();

courseRouter.post("/addCourse",addCourse);
courseRouter.delete("/deleteCourse/:id",deletecourse);
courseRouter.get("/activeStudents/:id",getActiveStudentsofCourse)
module.exports = courseRouter;
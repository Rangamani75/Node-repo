const mongoose = require("mongoose");
const enrollModel = require("../models/enrollModel");
const courseModel = require("../models/courseModel");
const studentModel = require("../models/studentModel");
const addenroll = async (req, res) => {
	console.log(req)
    try {
        const { courseId, studentId } = req.body;

        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ Error: "Course not found" });
        }
        if (!course.isActive) {
            return res.status(400).json({ Error: "Course is not active" });
        }

        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ Error: "Student not found" });
        }
        if (!student.isActive) {
            return res.status(400).json({ Error: "Student is not active" });
        }

        const enroll = await enrollModel.create(req.body);
        res.status(201).json({ message: "Enrollment added successfully", enroll });

    } catch (err) {
        res.status(500).json({ Error: "Error occurred while adding enrollment", details: err.message });
    }
};


module.exports={
	addenroll,
}
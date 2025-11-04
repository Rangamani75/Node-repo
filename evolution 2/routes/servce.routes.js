const express = require("express");
const router = express.Router();
const { bookService, completeService, getReport } = require("../controllers/service.controller");
const { auth } = require("../middlewares/auth.middleware");

router.post("/book", auth, bookService);
router.patch("/complete/:id", auth, completeService);
router.get("/report", auth, getReport);

module.exports = router;

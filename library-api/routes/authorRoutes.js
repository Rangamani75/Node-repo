const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

router.post("/create", createAuthor);
router.get("/author", authorController.getAuthors);

module.exports = router;




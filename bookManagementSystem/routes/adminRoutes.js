const express = require("express");
const router = express.Router();
const {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

router.post("/books", addBook);
router.get("/books", getAllBooks);
router.patch("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
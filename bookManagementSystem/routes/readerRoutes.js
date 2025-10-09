const express = require("express");
const router = express.Router();
const {
  getAvailableBooks,
  borrowBook,
  returnBook
} = require("../controllers/bookController");

const transactionLogger = require("../middlewares/transactionLogger");
const returnCheckMiddleware = require("../middlewares/returnCheckMiddleware");

router.get("/books", getAvailableBooks);
router.post("/borrow/:id", transactionLogger, borrowBook);
router.post("/return/:id", returnCheckMiddleware, transactionLogger, returnBook);

module.exports = router;
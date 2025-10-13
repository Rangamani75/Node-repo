const Library = require("../models/library.model");

// Middleware: Check required fields
const validateBookData = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Incomplete Data" });
  }
  next();
};

// Middleware: Limit user to 3 borrowed books
const checkBorrowLimit = async (req, res, next) => {
  const { borrowerName } = req.body;
  const borrowedCount = await Library.countDocuments({
    borrowerName,
    status: "borrowed",
  });

  if (borrowedCount >= 3) {
    return res.status(409).json({ message: "Borrowing limit exceeded (max 3 books)" });
  }

  next();
};

module.exports = {
  validateBookData,
  checkBorrowLimit,
};
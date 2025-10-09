const { readBooks } = require("../models/bookModel");

function returnCheckMiddleware(req, res, next) {
  const { id } = req.params;
  const book = readBooks().find(b => b.id === +id);

  if (!book || !book.borrowedDate) {
    return res.status(404).json({ error: "Book not found or not borrowed" });
  }

  const borrowedDate = new Date(book.borrowedDate);
  const currentDate = new Date();
  const diffDays = Math.floor((currentDate - borrowedDate) / (1000 * 60 * 60 * 24));

  if (diffDays < 3) {
    return res.status(400).json({ error: "Book cannot be returned within 3 days of borrowing." });
  }

  next();
}

module.exports = returnCheckMiddleware;
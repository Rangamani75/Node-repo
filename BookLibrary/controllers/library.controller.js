const Library = require("../models/library.model");

// Add Book
const addBook = async (req, res) => {
  try {
    const book = new Library({ ...req.body, status: "available" });
    await book.save();
    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Borrow Book
const borrowBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.status !== "available") {
      return res.status(409).json({ message: "Book is not available" });
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(borrowDate.getDate() + 14);

    book.status = "borrowed";
    book.borrowerName = req.body.borrowerName;
    book.borrowDate = borrowDate;
    book.dueDate = dueDate;
    await book.save();

    res.status(200).json({ message: "Book borrowed", book });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Return Book
const returnBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.status !== "borrowed") {
      return res.status(409).json({ message: "Book is not currently borrowed" });
    }

    const returnDate = new Date();
    book.returnDate = returnDate;
    book.status = "available";

    if (returnDate > book.dueDate) {
      const daysOverdue = Math.ceil((returnDate - book.dueDate) / (1000 * 60 * 60 * 24));
      book.overdueFees = daysOverdue * 10;
    }

    await book.save();
    res.status(200).json({ message: "Book returned", book });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All Books
const getBooks = async (req, res) => {
  try {
    const { title, status } = req.query;
    const query = {};
    if (title) query.title = new RegExp(title, "i");
    if (status) query.status = status;

    const books = await Library.find(query);
    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.status === "borrowed") {
      return res.status(409).json({ message: "Cannot delete a borrowed book" });
    }

    await book.remove();
    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  addBook,
  borrowBook,
  returnBook,
  getBooks,
  deleteBook,
};
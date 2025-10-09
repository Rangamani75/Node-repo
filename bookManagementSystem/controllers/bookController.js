const { readBooks, writeBooks } = require("../models/bookModel");

// ADMIN CONTROLLERS
function addBook(req, res) {
  const { title, author, genre, publishedYear } = req.body;
  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const books = readBooks();
  const newBook = {
    id: Date.now(),
    title,
    author,
    genre,
    publishedYear,
    status: "available"
  };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
}

function getAllBooks(req, res) {
  const books = readBooks();
  res.json(books);
}

function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, genre, publishedYear } = req.body;
  const books = readBooks();
  const idx = books.findIndex(b => b.id === +id);
  if (idx === -1) return res.status(404).json({ error: "Book not found" });

  books[idx] = { ...books[idx], title, author, genre, publishedYear };
  writeBooks(books);
  res.json(books[idx]);
}

function deleteBook(req, res) {
  const { id } = req.params;
  const books = readBooks();
  const updated = books.filter(b => b.id !== +id);
  if (updated.length === books.length)
    return res.status(404).json({ error: "Book not found" });

  writeBooks(updated);
  res.json({ message: "Book deleted successfully" });
}

// READER CONTROLLERS
function getAvailableBooks(req, res) {
  const books = readBooks().filter(b => b.status === "available");
  res.json(books);
}

function borrowBook(req, res) {
  const { id } = req.params;
  const { readerName } = req.body;

  if (!readerName) {
    return res.status(400).json({ error: "Reader name is required." });
  }

  const books = readBooks();
  const book = books.find(b => b.id === +id);

  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.status !== "available") return res.status(400).json({ error: "Book already borrowed" });

  book.status = "borrowed";
  book.borrowedBy = readerName;
  book.borrowedDate = new Date().toISOString().split("T")[0];

  writeBooks(books);
  res.json(book);
}

function returnBook(req, res) {
  const { id } = req.params;
  const books = readBooks();
  const book = books.find(b => b.id === +id);

  if (!book || book.status !== "borrowed") {
    return res.status(404).json({ error: "Book not found or not borrowed" });
  }

  book.status = "available";
  delete book.borrowedBy;
  delete book.borrowedDate;

  writeBooks(books);
  res.json({ message: "Book returned successfully", book });
}

module.exports = {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getAvailableBooks,
  borrowBook,
  returnBook
};
const express = require("express");
const { getAllBooks, addBook, bookRentals, updateBook, deleteBook } = require("../controllers/bookController");

const bookRouter = express.Router();

bookRouter.get("/getAllBooks",getAllBooks);
bookRouter.post("/addBook",addBook);
bookRouter.get("/bookRentals/:bookId",bookRentals)
bookRouter.put("/updateBook/:bookId",updateBook);
bookRouter.delete("/delete/:bookId",deleteBook)
module.exports = bookRouter;
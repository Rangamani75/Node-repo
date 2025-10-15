const Author = require("../models/authorModel");


exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate("books");
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
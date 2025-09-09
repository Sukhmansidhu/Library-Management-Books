const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn } = req.body;
    console.log("Uploaded file info:", req.file);

    if (!title || !author || !isbn) {
      return res.status(400).json({ message: "Title, author, and ISBN are required" });
    }

    const image = req.file ? req.file.filename : null;

    const book = new Book({ title, author, isbn, available: true, image });
    await book.save();

    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Error adding book", error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("borrowedBy", "_id username");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    let book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (!book.available) {
      return res.status(400).json({ message: "Book already borrowed" });
    }

    book.available = false;
    book.borrowedBy = req.user.id;
    await book.save();

    book = await Book.findById(id).populate("borrowedBy", "_id username");

    res.json({ message: "Book borrowed successfully", book });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ message: "Error borrowing book", error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    let book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (!book.borrowedBy || book.borrowedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot return this book" });
    }

    book.available = true;
    book.borrowedBy = null;
    await book.save();

    book = await Book.findById(id).populate("borrowedBy", "_id username");

    res.json({ message: "Book returned successfully", book });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ message: "Error returning book", error: error.message });
  }
};
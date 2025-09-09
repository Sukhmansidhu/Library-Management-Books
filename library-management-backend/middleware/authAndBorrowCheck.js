const jwt = require("jsonwebtoken");
const Book = require("../models/Book"); 

const authAndBorrowCheck = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

   
    if (req.user.role !== "member") {
      return res.status(403).json({ message: "Only members can borrow books" });
    }

   
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (!book.available) return res.status(400).json({ message: "Book not available" });

    req.book = book;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authAndBorrowCheck };
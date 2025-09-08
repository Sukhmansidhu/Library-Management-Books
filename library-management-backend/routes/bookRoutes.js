const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const { addBook, getBooks, borrowBook, returnBook } = require("../controllers/bookController");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Add book (admin only)
router.post("/", authMiddleware, requireRole("admin"), upload.single("image"), addBook);

// Get all books
router.get("/", authMiddleware, getBooks);

// Borrow a book
router.put("/borrow/:id", authMiddleware, requireRole("member"), borrowBook);

// Return a book
router.put("/return/:id", authMiddleware, requireRole("member"), returnBook);

module.exports = router;
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const { addBook, getBooks, borrowBook, returnBook } = require("../controllers/bookController");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");


const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post("/", authMiddleware, requireRole("admin"), upload.single("image"), addBook);


router.get("/", authMiddleware, getBooks);


router.put("/borrow/:id", authMiddleware, requireRole("member"), borrowBook);

router.put("/return/:id", authMiddleware, requireRole("member"), returnBook);

module.exports = router;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS for React frontend
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);   // ✅ mounted correctly
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
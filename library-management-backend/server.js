// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const bookRoutes = require("./routes/bookRoutes");
// const authRoutes = require("./routes/authRoutes");
// const path = require("path");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// const allowedOrigins = ["http://localhost:3000", "https://library-management-frontend1.netlify.app"];
// app.use(cors({
//   origin: function(origin, callback){
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/api/auth", authRoutes);
// app.use("/api/books", bookRoutes);

// try {
//   const contactRoutes = require("./routes/contactRoutes");
//   app.use("/api/contact", contactRoutes);
// } catch (error) {
//   console.warn("Contact routes not loaded:", error.message);
// }

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get(/^\/.*/, (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://library-management-frontend1.netlify.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow requests like Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

try {
  const contactRoutes = require("./routes/contactRoutes");
  app.use("/api/contact", contactRoutes);
} catch (error) {
  console.warn("Contact routes not loaded:", error.message);
}

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Catch-all route for React
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/register", (req, res) => register(req, res));
router.post("/login", (req, res) => login(req, res));


router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
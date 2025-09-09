const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); 

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.json({ success: true, msg: "Message received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Failed to send message" });
  }
});

module.exports = router;
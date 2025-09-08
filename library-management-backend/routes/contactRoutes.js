const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Make sure Contact model exists

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save message', error: err.message });
  }
});

module.exports = router;
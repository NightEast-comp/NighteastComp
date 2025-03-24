const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;

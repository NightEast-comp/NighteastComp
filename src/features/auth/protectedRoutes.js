const express = require('express');
const router = express.Router();

// Perbarui path impor authMiddleware sesuai lokasi sebenarnya.
// Misalnya, authMiddleware.js berada di: src/middleware/authMiddleware.js
const protect = require('../../middleware/authMiddleware');

// Route protected, misalnya untuk dashboard admin
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;
  
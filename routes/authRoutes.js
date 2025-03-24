const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs'); // Gunakan bcryptjs
const jwt = require('jsonwebtoken');
const { loginAdmin } = require('../controllers/adminController');

// Register admin (Optional, biasanya cuma sekali buat admin)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login admin menggunakan fungsi loginAdmin dari controller
router.post('/login', loginAdmin);

module.exports = router;

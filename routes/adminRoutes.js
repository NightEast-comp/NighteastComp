const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi 1: Cek field kosong
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password wajib diisi!'
      });
    }

    // Validasi 2: Cek username sudah ada
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Username sudah terdaftar!'
      });
    }

    // Buat admin baru
    const newAdmin = new Admin({
      username: username.trim(),
      password: password.trim()
    });

    // Simpan ke database (password akan di-hash otomatis oleh pre-save hook)
    await newAdmin.save();

    // Response sukses
    res.status(201).json({
      success: true,
      message: 'Admin berhasil didaftarkan!',
      data: {
        id: newAdmin._id,
        username: newAdmin.username
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
});

module.exports = router;
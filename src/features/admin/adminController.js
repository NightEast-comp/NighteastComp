const Admin = require('../../features/admin/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username dan password wajib diisi!'
      });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        message: 'Username sudah terdaftar'
      });
    }

    const newAdmin = new Admin({
      username,
      password // Akan di-hash otomatis oleh pre-save hook
    });

    await newAdmin.save();
    
    res.status(201).json({ message: 'Admin berhasil terdaftar' });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Tambahkan fungsi loginAdmin berikut:
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password wajib diisi' });
  }
  
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, message: 'Login berhasil', data: { token } });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

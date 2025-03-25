const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables dari .env
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
const authRoutes = require('./features/auth/authRoutes');
const protectedRoutes = require('./features/auth/protectedRoutes');
const adminRoutes = require('./features/admin/adminRoutes');
const placeRoutes = require('./features/places/placeRoutes');
app.use('/api/protected', protectedRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/places', placeRoutes);

// Serve static files (misalnya upload gambar)
app.use('/uploads', express.static(path.join(__dirname, 'upload')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Export instance Express
module.exports = app;

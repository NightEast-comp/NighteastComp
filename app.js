const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const protectedRoutes = require('./routes/protectedRoutes');

// Load environment variables dari .env
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/placeRoutes');
app.use('/api/protected', protectedRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
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

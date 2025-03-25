const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['Wisata', 'Makanan', 'Minuman'], required: true },
  location: String,
  images: [String],  // Simpan link gambar
  videos: [String],  // Simpan link video
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Place', placeSchema);

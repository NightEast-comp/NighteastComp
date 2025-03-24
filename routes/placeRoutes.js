const express = require('express');
const Place = require('../models/Place');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all places
router.get('/', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new place
router.post('/', authMiddleware, upload.fields([{ name: 'images' }, { name: 'videos' }]), async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];
    const videos = req.files['videos'] ? req.files['videos'].map(file => file.path) : [];

    const newPlace = new Place({
      title,
      description,
      category,
      location,
      images,
      videos
    });

    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update place
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete place
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: 'Place deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


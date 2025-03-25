const express = require('express');
const router = express.Router();
const placeController = require('./placeController'); // Pastikan file placeController.js ada di folder yang sama

// Route untuk mengambil semua tempat
router.get('/', placeController.getAllPlaces);

// Route untuk mengambil detail tempat berdasarkan ID
router.get('/:id', placeController.getPlaceById);

// Route untuk menambahkan tempat baru
router.post('/', placeController.createPlace);

// Route untuk mengupdate tempat
router.put('/:id', placeController.updatePlace);

// Route untuk menghapus tempat
router.delete('/:id', placeController.deletePlace);

module.exports = router;

// File: src/features/places/placeController.js
const Place = require('./placeModel'); // Pastikan path-nya sesuai dengan lokasi file placeModel.js

// GET: Ambil semua tempat wisata
const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data tempat', error });
  }
};

// GET: Ambil satu tempat berdasarkan ID
const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Tempat tidak ditemukan' });
    }
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data tempat', error });
  }
};

// POST: Tambah tempat wisata baru
const createPlace = async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(400).json({ message: 'Gagal menambahkan tempat', error });
  }
};

// PUT: Update data tempat wisata
const updatePlace = async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlace) {
      return res.status(404).json({ message: 'Tempat tidak ditemukan' });
    }
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(400).json({ message: 'Gagal memperbarui tempat', error });
  }
};

// DELETE: Hapus tempat wisata
const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) {
      return res.status(404).json({ message: 'Tempat tidak ditemukan' });
    }
    res.status(200).json({ message: 'Tempat berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus tempat', error });
  }
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
};

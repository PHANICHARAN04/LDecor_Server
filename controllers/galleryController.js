// server/controllers/galleryController.js
import Gallery from '../models/Gallery.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch gallery', error: err.message });
  }
};

export const addGalleryImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) return res.status(400).json({ message: 'Image file missing' });
    const imageUrl = await uploadToCloudinary(req.files.image);
    const newImage = await Gallery.create({ imageUrl, category: req.body.category || 'General' });
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
};

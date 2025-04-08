// server/controllers/serviceController.js
import Service from '../models/Service.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services', error: err.message });
  }
};

export const addService = async (req, res) => {
  try {
    if (!req.files || !req.files.image) return res.status(400).json({ message: 'Image file missing' });
    const imageUrl = await uploadToCloudinary(req.files.image);
    const newService = await Service.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category || 'General',
      imageUrl,
    });
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: 'Service creation failed', error: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
};
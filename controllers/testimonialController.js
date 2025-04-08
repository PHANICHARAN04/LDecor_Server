// server/controllers/testimonialController.js
import Testimonial from '../models/Testimonial.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error: err.message });
  }
};

export const addTestimonial = async (req, res) => {
  try {
    if (!req.files || !req.files.image) return res.status(400).json({ message: 'Image file missing' });
    const imageUrl = await uploadToCloudinary(req.files.image);
    const newTestimonial = await Testimonial.create({
      name: req.body.name,
      quote: req.body.quote,
      imageUrl,
    });
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(500).json({ message: 'Testimonial creation failed', error: err.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
};

// server/models/Testimonial.js
import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quote: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
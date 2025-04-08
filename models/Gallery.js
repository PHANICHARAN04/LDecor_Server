// server/models/Gallery.js
import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  category: { type: String, default: 'General' }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
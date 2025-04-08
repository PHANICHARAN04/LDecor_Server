// server/models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, default: 'General' }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
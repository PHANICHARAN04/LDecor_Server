// server/utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'lotus_decor',
      resource_type: 'image'
    });
    return result.secure_url;
  } catch (err) {
    throw new Error('Cloudinary Upload Failed');
  }
};

// server/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

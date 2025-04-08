// routes/galleryRoutes.js
import express from 'express';
import { getAllGallery, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', getAllGallery);
router.post('/', verifyToken, addGalleryImage);
router.delete('/:id', verifyToken, deleteGalleryImage);

export default router;
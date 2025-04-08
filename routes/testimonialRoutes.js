// routes/testimonialRoutes.js
import express from 'express';
import { getAllTestimonials, addTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', getAllTestimonials);
router.post('/', verifyToken, addTestimonial);
router.delete('/:id', verifyToken, deleteTestimonial);

export default router;
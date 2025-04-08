// routes/authRoutes.js
import express from 'express';
import { getProfile, login } from '../controllers/authController.js';
import { verifyToken } from '../utils/cloudinary.js';
const router = express.Router();

router.post('/adminlogin', login);
router.get('/profile',verifyToken,getProfile)

export default router;
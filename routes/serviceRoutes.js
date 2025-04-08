// routes/serviceRoutes.js
import express from 'express';
import { getAllServices, addService, deleteService } from '../controllers/serviceController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', getAllServices);
router.post('/', verifyToken, addService);
router.delete('/:id', verifyToken, deleteService);

export default router;
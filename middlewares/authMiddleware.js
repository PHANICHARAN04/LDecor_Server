// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken =async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const curruser=await User.findById(verified.id).select("-password")

    if (!curruser) return res.status(401).json({ message: 'User not found' });
    // if (curruser.role !== 'admin') return res.status(403).json({ message: 'Access Forbidden' });
    
    req.user = curruser;
    req.user.role='admin'
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
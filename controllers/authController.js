// server/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ token,user:{...user?._doc,role:'admin'} });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Optional: seed one default admin manually
export const seedAdmin = async () => {
  const exists = await User.findOne({ username: 'admin' });
  if (!exists) {
    const hashed = await bcrypt.hash('password', 10);
    await User.create({ username: 'admin', password: hashed });
    console.log('✅ Admin seeded');
  }
};


export const getProfile = async (req, res) => {
  const userId = req.user.id; // Assuming you have middleware to set req.user
  try {
    const user = await User.findById(userId).select('-password'); // Exclude password from the response
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ ...user?._doc,role:'admin' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  } 
}
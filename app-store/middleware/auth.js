// Middleware: `middleware/auth.js`
// Create a new file:
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify Token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Access denied');

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Check Admin Role
exports.requireAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
5/23/25, 7:27 PM - ChatGPT: if (user?.role !== 'admin') return res.status(403).send('Admin only');
  next();
};
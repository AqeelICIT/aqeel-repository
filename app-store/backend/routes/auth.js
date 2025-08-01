// Create Auth Routes (`routes/auth.js`)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hash });
  await newUser.save();
  res.send('User registered');
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;

// Update Registration in `auth.js`

Allow optional role (default = user):
const newUser = new User({ username, email, password: hash, role: req.body.role || 'user' });


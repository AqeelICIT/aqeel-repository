const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);


// User roles & JWT protection
// Update `User` Model (`models/User.js`)
// Add a role field:
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});
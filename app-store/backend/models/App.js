// 4. *Define the App Model*

// Create a file `models/App.js`:

// ```javascript
const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  name: { type: String, required: true },
  developer: String,
  description: String,
  downloadLink: String,
  iconUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('App', appSchema);
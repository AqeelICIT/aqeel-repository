// ```javascript
const express = require('express');
const router = express.Router();
const App = require('../models/App');

// Get all apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new app
router.post('/', async (req, res) => {
  const app = new App({
    name: req.body.name,
    developer: req.body.developer,
    description: req.body.description,
    downloadLink: req.body.downloadLink,
    iconUrl: req.body.iconUrl
  });
  try {
    const newApp = await app.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// SEARCH FUNCTIONALITY
// Update App Routes (`routes/apps.js`)
// Search apps by name
router.get('/search', async (req, res) => {
  const query = req.query.q || '';
  const results = await App.find({ name: new RegExp(query, 'i') });
  res.json(results);
});

// Protect Routes (`apps.js`)

// Use middleware for admin-only access:
const { verifyToken, requireAdmin } = require('../middleware/auth');

router.post('/', verifyToken, requireAdmin, async (req, res) => {
  const app = new App(req.body);
  await app.save();
  res.status(201).json(app);
});
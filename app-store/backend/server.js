// 6. *Create the Server*
// 
// Create a file `server.js`:
// 
// ```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const appRoutes = require('./routes/apps');
app.use('/api/apps', appRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port PORT`);
);

// Add Auth Routes in `server.js`
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
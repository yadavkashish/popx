// Load environment variables from .env file
require('dotenv').config();

// Log environment variables to verify they are loaded correctly
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('PORT:', process.env.PORT);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth'); // Import authentication routes

const app = express();
const PORT = process.env.PORT || 5000; // Use the port from env or default to 5000

// ==============================
// Middleware
// ==============================

// Enable Cross-Origin Resource Sharing for frontend-backend communication
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ==============================
// Routes
// ==============================

// All routes starting with /api/auth will be handled by authRoutes
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the authentication API' });
});
// ==============================
// Database Connection and Server Start
// ==============================

// Connect to MongoDB using the MONGO_URI from environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    // Start the server once the DB connection is successful
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log('MongoDB connection error:', err));

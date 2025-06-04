const express = require('express');
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const User = require('../models/User'); // Mongoose User model

const router = express.Router();

// ==============================
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
// ==============================

router.post('/register', async (req, res) => {
  const { fullName, phone, email, password, company, isAgency } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    // Hash the user's password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      fullName,
      phone,
      email,
      password: hashedPassword,
      company,
      isAgency,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    // Internal server error
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// @route   POST /api/auth/login
// @desc    Login user and return JWT token
// @access  Public
// ==============================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a JWT token with user ID and 1-day expiration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with token and limited user info
    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    // Internal server error
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

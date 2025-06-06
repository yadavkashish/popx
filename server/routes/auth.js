const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ==============================
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
// ==============================
router.post('/register', async (req, res) => {
  let { fullName, phone, email, password, company, isAgency } = req.body;

  try {
    // Normalize input
    email = email.trim().toLowerCase();
    password = password.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const newUser = new User({
      fullName,
      phone,
      email,
      password: hashedPassword,
      company,
      isAgency,
    });

    await newUser.save();
    console.log('✅ User registered:', email);
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// @route   POST /api/auth/login
// @desc    Login user and return JWT token
// @access  Public
// ==============================
router.post('/login', async (req, res) => {
  let { email, password } = req.body;

  try {
    // Normalize input
    email = email.trim().toLowerCase();
    password = password.trim();

    console.log('⚡ Login attempt:', email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found in DB');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('🔎 User found:', user.email);
    console.log('🧾 Hashed password from DB:', user.password);
    console.log('🔐 Entered password:', password);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// @route   GET /api/auth/test-users
// @desc    List all users (debug only)
// ==============================
router.get('/test-users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', authController.registerUser);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.loginUser);

// Example: Protected route for authenticated users
router.get('/me', authenticate, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed', user: req.user });
});

// Example: Admin-only route
router.get('/admin', authenticate, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'Admin route accessed', user: req.user });
});

module.exports = router;
// routes/adminRoutes.js
const express = require('express');
const { getAllUsers, deleteUser, updateUserRole } = require('../controllers/adminController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// GET - Get All Users (Admin Only)
router.get('/users', authenticate, authorizeRoles('admin'), getAllUsers);

// DELETE - Delete User (Admin Only)
router.delete('/user/:id', authenticate, authorizeRoles('admin'), deleteUser);

// PUT - Update User Role (Admin Only)
router.put('/user/:id/role', authenticate, authorizeRoles('admin'), updateUserRole);

module.exports = router;
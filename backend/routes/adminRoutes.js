const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

// Admin-only access for all routes below
router.use(authenticate);
router.use(authorizeRoles('admin'));

// GET /api/admin/users - fetch all users
router.get('/users', adminController.getAllUsers);

// DELETE /api/admin/users/:userId - delete user
router.delete('/users/:userId', adminController.deleteUser);

// PUT /api/admin/users/:userId/role - update user role
router.put('/users/:userId/role', adminController.updateUserRole);

module.exports = router;
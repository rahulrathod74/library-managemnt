const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, isAdmin, isAdminOrSelf } = require('../middleware/authMiddleware');
// Get all users 
router.get('/', verifyToken, isAdmin, getAllUsers);
// Get user by ID 
router.get('/:id', verifyToken, isAdminOrSelf, getUserById);
// Update user information 
router.put('/:id', verifyToken, isAdminOrSelf, updateUser);
// Delete a user
router.delete('/:id', verifyToken, isAdmin, deleteUser);
module.exports = router;
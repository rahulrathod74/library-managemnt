const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
// Register a new member
router.post('/register', registerUser);
// Log in user and issue JWT
router.post('/login', loginUser);
module.exports = router;
const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
// Create a new book 
router.post('/', verifyToken, isAdmin, createBook);
// Get all books 
router.get('/', getAllBooks);
// Get book by ID 
router.get('/:id', getBookById);
// Update book
router.put('/:id', verifyToken, isAdmin, updateBook);
// Delete book 
router.delete('/:id', verifyToken, isAdmin, deleteBook);
module.exports = router;
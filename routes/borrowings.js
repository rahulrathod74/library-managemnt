const express = require('express');
const router = express.Router();
const { borrowBook, returnBook, getAllBorrowingTransactions, getBorrowingTransactionById } = require('../controllers/borrowingController');
const { verifyToken, isMember, isAdminOrSelf } = require('../middleware/authMiddleware');
// Borrow a book 
router.post('/', verifyToken, isMember, borrowBook);
// Return a book 
router.put('/:id/return', verifyToken, isAdminOrSelf, returnBook);
// Get all borrowing transactions 
router.get('/', verifyToken, isAdmin, getAllBorrowingTransactions);
// Get borrowing transaction by ID 
router.get('/:id', verifyToken, isAdminOrSelf, getBorrowingTransactionById);
module.exports = router;
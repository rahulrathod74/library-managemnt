const BorrowingTransaction = require('../models/BorrowingTransaction');
const Book = require('../models/Book');
const User = require('../models/User');
// Borrow a book (Member only)
exports.borrowBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.userId;
    try {
        let book = await Book.findById(bookId);
        if (!book || book.copiesAvailable < 1) {
            return res.status(400).json({ msg: "Book not available" });
        }
        // Create a new borrowing transaction
        const borrowingTransaction = new BorrowingTransaction({
            book: bookId,
            member: userId,
            dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000 // Due in 7 days
        });
        // Decrease the available copies count
        book.copiesAvailable -= 1;
        await book.save();
        await borrowingTransaction.save();
        res.status(201).json(borrowingTransaction);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Return a book (Member only)
exports.returnBook = async (req, res) => {
    const { transactionId } = req.body;
    try {
        const borrowingTransaction = await BorrowingTransaction.findById(transactionId).populate('book');
        if (!borrowingTransaction || borrowingTransaction.status === 'Returned') {
            return res.status(400).json({ msg: "Invalid transaction or book already returned" });
        }
        // Mark the transaction as returned
        borrowingTransaction.returnDate = Date.now();
        borrowingTransaction.status = 'Returned';
        await borrowingTransaction.save();
        // Increase the available copies count for the book
        const book = await Book.findById(borrowingTransaction.book._id);
        book.copiesAvailable += 1;
        await book.save();
        res.json({ msg: "Book returned successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Get all borrowing transactions (Admin only)
exports.getAllBorrowingTransactions = async (req, res) => {
    try {
        const transactions = await BorrowingTransaction.find()
            .populate('book')
            .populate('member');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Get borrowing transaction by ID (Admin and Member)
exports.getBorrowingTransactionById = async (req, res) => {
    try {
        const transaction = await BorrowingTransaction.findById(req.params.id)
            .populate('book')
            .populate('member');
        if (!transaction) return res.status(404).json({ msg: "Transaction not found" });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};











require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');
const borrowingRoutes = require('./routes/borrowing');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();
// Connect Database
connectDB();
// Middleware
app.use(express.json()); // For parsing JSON request body
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/authors', authMiddleware, authorRoutes);
app.use('/api/books', authMiddleware, bookRoutes);
app.use('/api/borrowings', authMiddleware, borrowingRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});







const Book = require('../models/Book');
const Author = require('../models/Author');
// Create a new book 
exports.createBook = async (req, res) => {
    const { title, ISBN, summary, publicationDate, genres, copiesAvailable, authorId } = req.body;
    try {
        const author = await Author.findById(authorId);
        if (!author) return res.status(404).json({ msg: "Author not found" });
        const book = new Book({
            title, ISBN, summary, publicationDate, genres, copiesAvailable, author: authorId
        });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Get all books with query options (search, filter, pagination)
exports.getAllBooks = async (req, res) => {
    const { author, genre, title, page = 1, limit = 10 } = req.query;
    try {
        const query = {};
        if (author) query.author = author;
        if (genre) query.genres = { $in: [genre] };
        if (title) query.title = { $regex: title, $options: 'i' };
        const books = await Book.find(query)
            .populate('author')
            .limit(parseInt(limit))
            .skip((page - 1) * limit);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Get book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if (!book) return res.status(404).json({ msg: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Update book 
exports.updateBook = async (req, res) => {
    const { title, summary, publicationDate, genres, copiesAvailable } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: "Book not found" });
        book.title = title || book.title;
        book.summary = summary || book.summary;
        book.publicationDate = publicationDate || book.publicationDate;
        book.genres = genres || book.genres;
        book.copiesAvailable = copiesAvailable || book.copiesAvailable;
        await book.save();
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Delete book 
exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ msg: "Book deleted" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}










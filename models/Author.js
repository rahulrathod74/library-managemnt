const mongoose = require('mongoose');
const AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    biography: { type: String },
    dateOfBirth: { type: Date },
    nationality: { type: String }
});
module.exports = mongoose.model('Author', AuthorSchema);
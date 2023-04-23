// books.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Books = new Schema({
    bookName: {
        type: String
    },
    authorName: {
        type: String
    },
    quantity: {
        type: Number
    }
}, {
    collection: 'books'
});

module.exports = mongoose.model('Books', Books);
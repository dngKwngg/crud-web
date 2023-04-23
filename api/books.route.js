// books.route.js

const express = require('express');
const bookRoutes = express.Router();

// Require Business model in our routes module
let Book = require('./books.model.js');

// Defined store route
bookRoutes.route('/add').post(function (req, res) {
    let book = new Book(req.body);
    book.save()
        .then(book => {
            res.status(200).json({'book': 'book in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
bookRoutes.route('/').get(function (req, res) {
    Book.find().then((books) => {
        res.json(books);
    }).catch((err) => {
        console.log(err);
    });
});

// Defined edit route
bookRoutes.route('/edit/:id').get(async function (req, res) {
    try {
        let id = req.params.id;
        let bookData = await Book.findById(id);
        res.json(bookData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


//  Defined update route
bookRoutes.route('/update/:id').post(async function (req, res) {
    try {
        let book = await Book.findById(req.params.id);
        if (!book)
            res.status(404).send("data is not found");
        else {
            console.log(book);
            book.bookName = req.body.bookName;
            book.authorName = req.body.authorName;
            book.quantity = req.body.quantity;

            let bookData = await book.save();
            res.json('Update complete');
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("unable to update the database");
    }
});


// Defined delete | remove | destroy route
bookRoutes.route('/delete/:id').get(async function (req, res) {
    try {
        const book = await Book.findByIdAndRemove(req.params.id);
        if (!book) {
            return res.status(404).send("Data is not found");
        }
        return res.json("Successfully removed");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
});


module.exports = bookRoutes;
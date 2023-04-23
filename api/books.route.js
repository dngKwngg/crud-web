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
bookRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Book.findById(id, function (err, bookData){
        res.json(bookData);
    });
});

//  Defined update route
bookRoutes.route('/update/:id').post(function (req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (!book)
            res.status(404).send("data is not found");
        else {
            console.log(book);
            book.bookName = req.body.bookName;
            book.authorName = req.body.authorName;
            book.quantity = req.body.quantity;

            book.save().then(bookData => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
bookRoutes.route('/delete/:id').get(function (req, res) {
    Book.findByIdAndRemove({_id: req.params.id}, function(err, book){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = bookRoutes;
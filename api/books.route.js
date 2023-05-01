const express = require('express');
const productRoutes = express.Router();


// Require Product model in our routes module
const Product = require('./books.model.js');

// Defined add route
productRoutes.route('/add').post(function (req, res) {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        ratings: req.body.ratings,
        numOfReviews: req.body.numOfReviews,
        price: req.body.price,
        countInStock: req.body.countInStock
    });
    product.save()
        .then(product => {
            res.status(200).json({'product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

// Defined get data(index or listing) route
productRoutes.route('/').get(function (req, res) {
    Product.find().then((products) => {
        res.json(products);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Internal server error");
    });
});

// Defined edit route
productRoutes.route('/edit/:id').get(async function (req, res) {
    try {
        const id = req.params.id;
        const productData = await Product.findById(id);
        res.json(productData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Defined update route
productRoutes.route('/update/:id').post(async function (req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Data not found");
        } else {
            product.name = req.body.name;
            product.image = req.body.image;
            product.description = req.body.description;
            product.ratings = req.body.ratings;
            product.numOfReviews = req.body.numOfReviews;
            product.price = req.body.price;
            product.countInStock = req.body.countInStock;

            const productData = await product.save();
            res.json('Product update complete');
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("Unable to update the database");
    }
});

// Defined delete | remove | destroy route
productRoutes.route('/delete/:id').delete(async function (req, res) {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).send("Data not found");
    }
    return res.json("Product successfully removed");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

module.exports = productRoutes;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for products
let ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'products'
});

// Create a connection to the database
mongoose.connect('mongodb+srv://adminrumi:102030456789a@clusterrumi.9mnsjax.mongodb.net/BookDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(error => console.log('Database connection error:', error));


// Export the Product model
module.exports = mongoose.model('Product', ProductSchema);
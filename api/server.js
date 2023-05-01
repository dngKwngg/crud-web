const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const MONGO_URL = "mongodb+srv://adminrumi:102030456789a@clusterrumi.9mnsjax.mongodb.net/BookDatabase?retryWrites=true&w=majority";
const productRoutes = require('./books.route.js');

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database is connected');
        app.listen(PORT, function(){
            console.log('Server is running on Port:',PORT);
        });
    }).catch((err) => {
        console.log('Can not connect to the database', err);
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/products', productRoutes); // Updated route path
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    colors: [String], // Array of strings for different colors
    // Add other fields as needed
});

module.exports = mongoose.model('Product.js', productSchema);

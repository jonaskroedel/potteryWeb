const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Using the image filename (UUID) as ID
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

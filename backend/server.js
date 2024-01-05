const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Product = require('./models/Product'); // Ensure this path is correct

// MongoDB URI - replace with your actual URI
const mongoDBUri = "mongodb+srv://jonaskroedel:110901@potterydev.tiflcrh.mongodb.net/";

// Connect to MongoDB
mongoose.connect(mongoDBUri)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const app = express();

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

// Serve static files and set up JSON parsing
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Serve images from uploads directory
app.use(express.json());
app.use(cors());

// Endpoint to add a new product
app.post('/api/add-product', upload.single('image'), async (req, res) => {
    try {
        const { name, price, color, description } = req.body;
        const image = req.file;

        console.log('Received product data:', { name, price, color, description });
        console.log('Received file:', image);

        const newProduct = new Product({
            _id: image.filename.split('.')[0],
            name,
            price: parseFloat(price),
            color,
            description,
            imageUrl: `/uploads/${image.filename}`
        });

        await newProduct.save();
        console.log('Product saved to database:', newProduct);

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: error.message });
    }
});


// Endpoint to get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Additional routes and server configurations as needed

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
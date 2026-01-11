const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        let query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Create a product (Admin only - simplified for now)
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, modelUrl, stock } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            modelUrl,
            stock
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

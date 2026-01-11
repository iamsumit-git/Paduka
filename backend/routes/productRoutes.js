const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', productController.getAllProducts);

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', productController.getProductById);

// @route   POST /api/products
// @desc    Create a product
// @access  Public (Should be Admin only)
router.post('/', productController.createProduct);

module.exports = router;

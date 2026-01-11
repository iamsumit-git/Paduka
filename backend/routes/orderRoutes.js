const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', authMiddleware, orderController.createOrder);

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', authMiddleware, orderController.getUserOrders);

module.exports = router;

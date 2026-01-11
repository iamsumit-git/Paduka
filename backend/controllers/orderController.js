const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;

        let totalAmount = 0;
        const validatedItems = [];

        // Validate items and calculate total from DB
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for: ${product.name}` });
            }

            validatedItems.push({
                product: item.product,
                quantity: item.quantity,
                price: product.price
            });

            totalAmount += product.price * item.quantity;

            // Optional: Reduce stock here or in a separate transaction
            product.stock -= item.quantity;
            await product.save();
        }

        const newOrder = new Order({
            user: req.user.id,
            items: validatedItems,
            totalAmount
        });

        const order = await newOrder.save();
        res.status(201).json(order);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get logged in user orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

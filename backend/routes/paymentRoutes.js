const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create-payment-intent', authMiddleware, async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects amount in cents
            currency: currency || 'inr',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

module.exports = router;

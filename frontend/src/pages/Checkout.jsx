import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Replace with your Stripe Publishable Key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { cartItems, clearCart, cartTotal } = useContext(CartContext);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`, // Simplified for now
            },
            redirect: 'if_required'
        });

        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage("Payment Success!");

            // Create Order in Backend
            try {
                const orderItems = cartItems.map(item => ({
                    product: item._id,
                    quantity: item.amount,
                    price: item.price
                }));

                const res = await fetch('http://localhost:5000/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    },
                    body: JSON.stringify({ items: orderItems })
                });

                if (res.ok) {
                    clearCart();
                    alert('Order Placed Successfully!');
                    navigate('/');
                } else {
                    console.error('Order creation failed');
                }

            } catch (err) {
                console.error('Error creating order:', err);
            }

            setIsProcessing(false);
        } else {
            setMessage("Payment failed or processing.");
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <PaymentElement />
            <button
                type="submit"
                disabled={isProcessing || !stripe || !elements}
                className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
            >
                {isProcessing ? "Processing..." : `Pay ₹${cartTotal}`}
            </button>
            {message && <div className="mt-4 text-red-500 font-semibold">{message}</div>}
        </form>
    );
};

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState('');
    const { cartTotal, cartItems } = useContext(CartContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads if cart has items and user is logged in
        if (cartTotal > 0 && token) {
            console.log("Fetching payment intent for amount:", cartTotal);
            fetch('http://localhost:5000/api/payment/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ amount: cartTotal, currency: 'inr' }),
            })
                .then(res => {
                    if (!res.ok) throw new Error('Network response was not ok');
                    return res.json();
                })
                .then(data => {
                    console.log("Client Secret received");
                    setClientSecret(data.clientSecret);
                })
                .catch(err => console.error("Error creating payment intent:", err));
        }
    }, [cartTotal, token]);

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty.</h2>
                <p onClick={() => window.location.href = '/products'} className="text-blue-600 cursor-pointer hover:underline">
                    Go back to Shop
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
            <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
                {clientSecret && stripePromise ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm clientSecret={clientSecret} />
                    </Elements>
                ) : (
                    <div className="text-center">
                        <p className="mb-2">Loading payment methods...</p>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;

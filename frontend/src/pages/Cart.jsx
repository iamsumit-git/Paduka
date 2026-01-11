import React, { useContext, useState } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        product: item._id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                })
            });

            if (response.ok) {
                setMessage('Order placed successfully!');
                clearCart();
            } else {
                setMessage('Failed to place order.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setMessage('Error placing order.');
        }
    };

    if (cartItems.length === 0) {
        return <div className="container mx-auto px-4 py-8 text-center"><h2 className="text-2xl font-bold">Your cart is empty</h2></div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
            {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-3/4">
                    {cartItems.map(item => (
                        <div key={item._id} className="flex items-center border-b py-4">
                            <img src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">₹{item.price}</p>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item._id)} className="ml-4 text-red-600 hover:text-red-800">Remove</button>
                        </div>
                    ))}
                </div>

                <div className="md:w-1/4">
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Summary</h3>
                        <div className="flex justify-between mb-4">
                            <span>Subtotal</span>
                            <span>₹{getCartTotal()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Total: ₹{getCartTotal()}</h2>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="bg-green-600 text-white font-bold py-3 px-8 rounded hover:bg-green-700 transition duration-300"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

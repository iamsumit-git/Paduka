import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item => item._id === id ? { ...item, quantity: parseInt(quantity) } : item)
        );
    }

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const cartTotal = getCartTotal();

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;

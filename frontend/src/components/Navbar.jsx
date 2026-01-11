import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const { cartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const isAdmin = user && user.role === 'admin';

    return (
        <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400 hover:text-white transition">
                        Paduka
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
                        <Link to={user ? "/products" : "/login"} className="hover:text-blue-400 transition">Shop</Link>

                        {isAdmin && (
                            <Link to="/admin/upload" className="text-yellow-400 hover:text-yellow-300 font-semibold transition">
                                Admin Panel
                            </Link>
                        )}

                        {user ? (
                            <>
                                <Link to="/cart" className="relative hover:text-blue-400 transition">
                                    Cart
                                    {cartTotal > 0 && (
                                        <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                                            ₹{cartTotal}
                                        </span>
                                    )}
                                </Link>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-400">Hi, {user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
                                <Link to="/signup" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Hamburger Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="outline-none mobile-menu-button">
                            <svg className="w-6 h-6 hover:text-gray-200"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800`}>
                <Link to="/" onClick={toggleMenu} className="block py-4 px-4 text-sm hover:bg-gray-700">Home</Link>
                <Link to={user ? "/products" : "/login"} onClick={toggleMenu} className="block py-4 px-4 text-sm hover:bg-gray-700">Shop</Link>

                {isAdmin && (
                    <Link to="/admin/upload" onClick={toggleMenu} className="block py-4 px-4 text-sm text-yellow-400 hover:bg-gray-700">
                        Admin Panel
                    </Link>
                )}

                {user ? (
                    <>
                        <Link to="/cart" onClick={toggleMenu} className="block py-4 px-4 text-sm hover:bg-gray-700">
                            Cart (₹{cartTotal})
                        </Link>
                        <button
                            onClick={() => { handleLogout(); toggleMenu(); }}
                            className="w-full text-left block py-4 px-4 text-sm text-red-400 hover:bg-gray-700"
                        >
                            Logout ({user.name})
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" onClick={toggleMenu} className="block py-4 px-4 text-sm hover:bg-gray-700">Login</Link>
                        <Link to="/signup" onClick={toggleMenu} className="block py-4 px-4 text-sm hover:bg-gray-700">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

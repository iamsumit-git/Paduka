import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import heroBg from '../assets/hero-bg.png';

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleShopNow = () => {
        if (user) {
            navigate('/products');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white overflow-hidden h-[600px]">
                <div className="absolute inset-0">
                    <img
                        src={heroBg}
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
                        Step Into <span className="text-blue-400">Luxury</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl drop-shadow-md">
                        Experience the perfect blend of tradition and modern comfort with Paduka's premium footwear collection.
                    </p>
                    <button
                        onClick={handleShopNow}
                        className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-full shadow-xl hover:bg-blue-700 hover:scale-105 transition transform duration-300"
                    >
                        {user ? 'Explore Collection' : 'Start Shopping'}
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Paduka?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                👟
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                            <p className="text-gray-600">Hand-picked materials ensuring durability and ultimate comfort.</p>
                        </div>
                        <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                🎨
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Artisanal Design</h3>
                            <p className="text-gray-600">Unique designs that reflect rich cultural heritage and modern trends.</p>
                        </div>
                        <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                🚚
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">Quick and secure shipping to your doorstep across the country.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 py-16 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to upgrade your style?</h2>
                <button
                    onClick={handleShopNow}
                    className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow hover:bg-gray-100 transition duration-300"
                >
                    Shop Now
                </button>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 py-8 text-center mt-auto">
                <p>&copy; 2024 Paduka. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;

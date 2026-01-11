import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [filter]);

    const fetchProducts = async () => {
        try {
            let url = 'http://localhost:5000/api/products';
            if (filter) {
                url += `?category=${filter}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Collection</h2>

            <div className="flex justify-center mb-8">
                <button onClick={() => setFilter('')} className={`px-4 py-2 mx-2 rounded ${filter === '' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>All</button>
                <button onClick={() => setFilter('Men')} className={`px-4 py-2 mx-2 rounded ${filter === 'Men' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Men</button>
                <button onClick={() => setFilter('Women')} className={`px-4 py-2 mx-2 rounded ${filter === 'Women' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Women</button>
                <button onClick={() => setFilter('Kids')} className={`px-4 py-2 mx-2 rounded ${filter === 'Kids' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Kids</button>
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                            <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-2 truncate">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">₹{product.price}</span>
                                    <Link to={`/products/${product._id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import ShoeViewer from '../components/ShoeViewer';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    };

    if (loading) return <p className="text-center mt-8">Loading...</p>;
    if (!product) return <p className="text-center mt-8">Product not found</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Image / 3D Viewer Section */}
                <div className="w-full md:w-1/2 h-96 bg-gray-100 rounded-lg flex items-center justify-center relative">
                    {product.modelUrl ? (
                        <div className="w-full h-full">
                            <ShoeViewer modelUrl={product.modelUrl} />
                        </div>
                    ) : (
                        <img src={product.imageUrl || 'https://via.placeholder.com/500'} alt={product.name} className="w-full h-full object-contain" />
                    )}
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <p className="text-2xl font-bold mb-6">₹{product.price}</p>

                    <div className="mb-6">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            {product.category}
                        </span>
                        <span className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-700">
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition duration-300"
                        disabled={product.stock <= 0}
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

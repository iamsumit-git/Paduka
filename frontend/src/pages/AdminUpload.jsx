import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const AdminUpload = () => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Men',
        stock: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [modelFile, setModelFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { name, description, price, category, stock } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            headers: {
                'x-auth-token': token
            },
            body: formData
        });

        if (!res.ok) {
            throw new Error('File upload failed');
        }

        const data = await res.text();
        return data; // Returns the path
    };

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            let imageUrl = '';
            let modelUrl = '';

            if (imageFile) {
                const path = await uploadFile(imageFile);
                imageUrl = `http://localhost:5000${path}`;
            }

            if (modelFile) {
                const path = await uploadFile(modelFile);
                modelUrl = `http://localhost:5000${path}`;
            }

            const productData = {
                name,
                description,
                price,
                category,
                stock,
                imageUrl,
                modelUrl
            };

            const res = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'x-auth-token': token // Uncomment if product creation is protected
                },
                body: JSON.stringify(productData)
            });

            if (res.ok) {
                setMessage('Product created successfully!');
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Men',
                    stock: ''
                });
                setImageFile(null);
                setModelFile(null);
            } else {
                setMessage('Failed to create product.');
            }

        } catch (err) {
            console.error(err);
            setMessage('Error creating product: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Admin Upload</h2>
            {message && <p className="text-center mb-4 font-semibold">{message}</p>}

            <form onSubmit={onSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Product Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required className="w-full px-3 py-2 border rounded" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea name="description" value={description} onChange={onChange} required className="w-full px-3 py-2 border rounded" rows="3"></textarea>
                </div>

                <div className="flex gap-4 mb-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-bold mb-2">Price (₹)</label>
                        <input type="number" name="price" value={price} onChange={onChange} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-bold mb-2">Stock</label>
                        <input type="number" name="stock" value={stock} onChange={onChange} required className="w-full px-3 py-2 border rounded" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Category</label>
                    <select name="category" value={category} onChange={onChange} className="w-full px-3 py-2 border rounded">
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                        <option value="Custom">Custom</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Product Image</label>
                    <input type="file" onChange={(e) => handleFileChange(e, setImageFile)} accept="image/*" required className="w-full" />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">3D Model (.glb)</label>
                    <input type="file" onChange={(e) => handleFileChange(e, setModelFile)} accept=".glb,.gltf" className="w-full" />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition">
                    {loading ? 'Uploading...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default AdminUpload;

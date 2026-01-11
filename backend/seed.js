const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const ADJECTIVES = ['Premium', 'Classic', 'Urban', 'Sporty', 'Elegant', 'Vintage', 'Modern', 'Sleek', 'Rugged', 'Casual'];
const MATERIALS = ['Leather', 'Canvas', 'Suede', 'Mesh', 'Synthetic', 'Knit', 'Velvet', 'Denim'];
const TYPES = ['Sneakers', 'Loafers', 'Boots', 'Running Shoes', 'Sandals', 'Oxfords', 'Slip-ons', 'High-tops'];
const COLORS = ['Black', 'White', 'Brown', 'Blue', 'Red', 'Grey', 'Tan', 'Green'];
const CATEGORIES = ['Men', 'Women', 'Kids'];

// Pre-defined high-quality shoe images from Unsplash
const IMAGES = [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop"
];

// Special 3D Model Product
const SPECIAL_PRODUCT = {
    name: "Paduka Signature 3D",
    description: "Experience the future of footwear with our interactive 3D view. Rotate, zoom, and explore every detail.",
    price: 9999,
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
    stock: 50
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateProducts = (count) => {
    const products = [];
    products.push(SPECIAL_PRODUCT); // Always include the 3D model

    for (let i = 0; i < count; i++) {
        const type = getRandom(TYPES);
        const adj = getRandom(ADJECTIVES);
        const material = getRandom(MATERIALS);
        const color = getRandom(COLORS);

        products.push({
            name: `${adj} ${color} ${type}`,
            description: `A ${adj.toLowerCase()} pair of ${color.toLowerCase()} ${type.toLowerCase()} crafted from high-quality ${material.toLowerCase()}. Perfect for any occasion.`,
            price: getRandomInt(999, 9999),
            category: getRandom(CATEGORIES),
            imageUrl: getRandom(IMAGES),
            stock: getRandomInt(5, 100)
        });
    }
    return products;
};

const seedDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        console.log('Clearing existing products...');
        await Product.deleteMany({});

        console.log('Generating 100+ unique products...');
        const products = generateProducts(100);

        await Product.insertMany(products);
        console.log(`Successfully seeded ${products.length} products!`);

        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();

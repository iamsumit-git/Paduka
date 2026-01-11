const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
console.log('Attempting to connect to MongoDB at:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if DB fails
    });

mongoose.connection.on('error', err => {
    console.error('MongoDB runtime error:', err);
});


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

// Make uploads folder static
app.use('/backend/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads')); // Fallback/easier access

app.get('/', (req, res) => {
    res.send('Paduka API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

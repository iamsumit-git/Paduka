Paduka E-Commerce Platform - Documentation
Paduka is a full-stack (MERN) e-commerce application designed for a premium footwear shopping experience. It features 3D product visualization, secure payments with Stripe, and a comprehensive admin panel.

🚀 Quick Start
Prerequisites
Node.js installed.
MongoDB running locally or a cloud URI.
1. Start the Backend
cd backend
npm install
npm start
Server runs on: http://localhost:5000 Note: The database is automatically seeded with 100+ products on the first run.

2. Start the Frontend
cd frontend
npm install
npm run dev
Application runs on: http://localhost:5173

🛠️ Features & Usage
1. Shopping (User)
Browse: Explore 100+ products with infinite styles.
Search & Filter: Navigate by category (Men, Women, Kids) - coming soon.
3D View: Look for the "Paduka Signature 3D" product to interact with the 3D model.
Cart: Add items, adjust quantities, and view total.
Checkout: Secure checkout using Stripe (Test Mode).
2. Payments (Stripe Test Mode)
Use the following test card details:

Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/30)
CVC: 123
Zip: 12345
👑 Admin Guide
The Admin Panel allows you to upload new products, images, and 3D models.

Step 1: Create an Admin User
By default, all new signups are regular user role. To promote a user to admin:

Sign Up a new account on Paduka (e.g., admin@paduka.com).
Open your MongoDB Database (using MongoDB Compass, Shell, or Atlas).
Go to the paduka database -> users collection.
Find the user document you just created.
Edit the role field:
// Change "user" to:
role: "admin"
Click Update/Save.
Step 2: Access Admin Panel
Logout and Login again (or refresh the page).
You will now see a gold "Admin Panel" link in the Navbar.
Click it to go to /admin/upload.
Step 3: Uploading Products
Product Name: Enter a catchy name.
Description: Describe the shoe.
Price: INR value.
Image: Upload a JPG/PNG file.
3D Model (Optional): Upload a .glb or .gltf file.
Click Upload Product. It will immediately appear in the Shop.
🔧 Troubleshooting
"Endless Loading" on Checkout: Ensure you have items in the cart and the backend is running.
Images not loading: Verify the backend/uploads folder exists.
Database Connection Error: Check your .env file in backend/ and ensure MongoDB is running.
🏗️ Project Structure
Backend: Express.js, Mongoose, Stripe SDK, Multer (Uploads).
Frontend: React, Tailwind CSS, Three.js (Fiber), Stripe Elements.
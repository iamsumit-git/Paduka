# Free Deployment Strategy for Paduka

This guide outlines how to deploy the Paduka E-Commerce platform for **zero cost** using robust free-tier services.

## Architecture Overview
- **Frontend (React)**: Hosted on **Vercel**.
- **Backend (Express)**: Hosted on **Render** (Free Web Service).
- **Database**: **MongoDB Atlas** (M0 Free Cluster).
- **Storage (Images/3D)**: **Cloudinary** (Free Tier).

---

## 1. Prerequisites (Cloudinary Setup)
Since Render's free tier files are ephemeral (deleted on restart), you **cannot** use the local `uploads/` folder. You must modify `uploadController.js` to use Cloudinary.

1.  Sign up at [Cloudinary.com](https://cloudinary.com/).
2.  Get your `CLOUDINARY_CLOUD_NAME`, `API_KEY`, and `API_SECRET`.
3.  Install: `npm install cloudinary multer-storage-cloudinary` in backend.
4.  Update `backend/middleware/uploadMiddleware.js` to use Cloudinary storage instead of `diskStorage`.

---

## 2. Backend Deployment (Render)
1.  Push your code to **GitHub**.
2.  Sign up at [Render.com](https://render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Settings**:
    -   **Root Directory**: `backend`
    -   **Build Command**: `npm install`
    -   **Start Command**: `node server.js`
6.  **Environment Variables**:
    -   Add `MONGO_URI` (from your local .env, ensuring access is allowed from 0.0.0.0/0 in Atlas).
    -   Add `JWT_SECRET`.
    -   Add `STRIPE_SECRET_KEY`.
    -   Add Cloudinary credentials.
7.  Click **Create Web Service**.
8.  **Copy the URL** provided (e.g., `https://paduka-backend.onrender.com`).

---

## 3. Frontend Deployment (Vercel)
1.  Sign up at [Vercel.com](https://vercel.com/).
2.  Click **Add New Project**.
3.  Import your GitHub repository.
4.  **Settings**:
    -   **Framework Preset**: Vite
    -   **Root Directory**: `frontend`
5.  **Environment Variables**:
    -   You need to point the frontend to your live backend.
    -   Create a file `.env.production` in `frontend/` (or set in Vercel UI).
    -   `VITE_API_URL=https://paduka-backend.onrender.com` (Your Render URL).
    -   *Note: You will need to update your frontend API calls to use this variable instead of hardcoded `localhost:5000`.*
6.  Click **Deploy**.

---

## 4. Final Configuration
1.  **Stripe**: Go to your Stripe Dashboard -> Developers -> API Keys. Ensure you are using Test keys.
2.  **CORS**: Update `backend/server.js` to allow the Vercel domain in `cors()`.
    ```javascript
    app.use(cors({
        origin: ["https://your-paduka-app.vercel.app", "http://localhost:5173"]
    }));
    ```
3.  **Redeploy Backend**: Push the CORS change to GitHub; Render will auto-deploy.

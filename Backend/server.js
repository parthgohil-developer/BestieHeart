const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/form', formRoutes);

// Health check endpoint (Useful for Render deployment)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running correctly' });
});

// Start Server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel Serverless
module.exports = app;

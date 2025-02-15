const express = require('express');
const connectDB = require('./connect');
const urlRoutes = require('./routes/url'); // URL route imports
const app = express();
const PORT = 8001;

// Connect to MongoDB
connectDB('mongodb://127.0.0.1:27017/short-url');

// Middleware setup
app.use(express.json()); // For parsing application/json

// URL routes
app.use('/url', urlRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

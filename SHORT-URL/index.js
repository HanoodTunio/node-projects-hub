const express = require('express');
const connectDB = require('./connect');
const urlRoutes = require('./routes/url'); // URL route imports
const path = require("path")
const URL = require("./model/url")

const app = express();
const PORT = 8001;

// Connect to MongoDB
connectDB('mongodb://127.0.0.1:27017/short-url');

app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

// Middleware setup
app.use(express.json()); // For parsing application/json


app.use("/test", async (req, res) => {
    const allUrls = await URL.find({})
    return res.render('home', { urls: allUrls });
});

// URL routes
app.use('/url', urlRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

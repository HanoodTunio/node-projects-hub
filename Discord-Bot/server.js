require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const URL = require("./models/url"); // Import URL model

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/discord-short-url", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Redirect Short URL
app.get("/:shortID", async (req, res) => {
    const shortID = req.params.shortID;
    const urlEntry = await URL.findOne({ shortID });

    if (!urlEntry) {
        return res.status(404).send("❌ URL Not Found");
    }

    res.redirect(urlEntry.redirectURL); // Redirect to the original URL
});

// Start the Express server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

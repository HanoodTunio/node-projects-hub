const mongoose = require("mongoose");

// URL schema
const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true, // Ensures that short ID is unique
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true }); // Timestamps will store createdAt and updatedAt

// Create model based on the schema
const URL = mongoose.model("URL", urlSchema);

module.exports = URL;

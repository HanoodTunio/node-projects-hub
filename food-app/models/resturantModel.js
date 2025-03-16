const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a Restaurant title"],
    },
    imageUrl: {
        type: String,
    },
    food: {
        type: [String] // Array of food items
    },
    time: {
        type: String
    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    logoUrl: {
        type: String
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: Number, // Changed from String to Number
        default: 0
    },
    coords: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        address: {
            type: String
        },
        title: {
            type: String
        }
    }
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

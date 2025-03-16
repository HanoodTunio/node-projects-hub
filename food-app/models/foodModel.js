const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    foodType: {
        type: String,
    },
    category: {
        type: String,
    },
    code: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String,
    }

}, { timeseries: true });

module.exports = mongoose.model("Food", foodSchema);
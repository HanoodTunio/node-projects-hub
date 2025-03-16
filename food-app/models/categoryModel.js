const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category title is required"],
    },
    imageUrl: {
        type: String,
        default: "https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png"
    },

}, { timestamps: true })

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
const User = require("../models/user"); // Ensure the model is correctly imported

const createUser = async (req, res) => {
    try {
        const { name, userName, email } = req.body;

        // ✅ Check for missing fields
        if (!name || !userName || !email) {
            return res.status(400).json({ message: "All fields (name, userName, email) are required" });
        }

        const newUser = new User({ name, userName, email });

        // ✅ Save to MongoDB
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createUser };

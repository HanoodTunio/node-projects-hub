const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 8080;

// connecting mongoose
mongoose
    .connect("mongodb://127.0.0.1:27017/Learning-Phase")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error:", err));

// Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    }
});

// Create Mongoose Model
const User = mongoose.model("User", userSchema);

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: false }));

// Middleware for logging
app.use((req, res, next) => {
    fs.appendFile("log.txt", `${Date.now()}: ${req.method} ${req.url} \n`, (err, data) => {
        next();
    });
});

// GET all users from the database
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from MongoDB
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ msg: "Error fetching users" });
    }
});

// GET a specific user by ID from the database
app.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);  // Fetch user by ID from MongoDB
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ msg: "Error fetching user" });
    }
});

// CREATE a new user
app.post("/api/users", async (req, res) => {
    const { first_name, last_name, email, gender } = req.body;

    if (!first_name || !email || !gender) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }

    try {
        const newUser = new User({
            first_name,
            last_name,
            email,
            gender
        });

        await newUser.save();  // Save user to MongoDB
        return res.status(201).json({ msg: "User created", user: newUser });
    } catch (err) {
        return res.status(500).json({ msg: "Error saving user" });
    }
});

// UPDATE an existing user by ID
app.patch("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Update user
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.json({ msg: "User updated", user });
    } catch (err) {
        return res.status(500).json({ msg: "Error updating user" });
    }
});

// DELETE a user by ID
app.delete("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);  // Delete user by ID
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.json({ msg: "User deleted" });
    } catch (err) {
        return res.status(500).json({ msg: "Error deleting user" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}...`);
});

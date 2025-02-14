// controllers/userController.js
const User = require('../models/user'); // Adjust the path as necessary

// GET all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching users" });
    }
};

// GET a specific user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching user" });
    }
};

// CREATE a new user
exports.createUser = async (req, res) => {
    const { first_name, last_name, email, gender } = req.body;
    if (!first_name || !email || !gender) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }
    try {
        const newUser = new User({ first_name, last_name, email, gender });
        await newUser.save();
        res.status(201).json({ msg: "User created", user: newUser });
    } catch (err) {
        res.status(500).json({ msg: "Error saving user" });
    }
};

// UPDATE an existing user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ msg: "User updated", user });
    } catch (err) {
        res.status(500).json({ msg: "Error updating user" });
    }
};

// DELETE a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ msg: "User deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting user" });
    }
};

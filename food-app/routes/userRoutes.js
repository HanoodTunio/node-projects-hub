const express = require("express");
const { getUserController, updateUserController, updateUserPasswordController, resetUserPasswordController } = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");
const router = express.Router();

//get user
router.get("/getUser", authMiddleware, getUserController);

// update profile
router.put("/updateUser", authMiddleware, updateUserController);

// password update
router.put("/updateUserPassword", authMiddleware, updateUserPasswordController);

// reset password
router.post("/resetPassword", authMiddleware, resetUserPasswordController);

// delete a user
router.delete("/deleteUser", authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" })
        res.json({ message: "User deleted successfully" });

    }
    catch {
        res.status(500).json({ message: "Failed to delete user" });
    }
})


module.exports = router;
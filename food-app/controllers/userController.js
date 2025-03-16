const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getUserController = async (req, res) => {
    try {
        // find user 
        const user = await User.findById({ _id: req.body.id });
        // validation user
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        // hide password
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'User get Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in GET User API',
            error: error.message
        })

    }
}

// Update user
const updateUserController = async (req, res) => {
    try {
        // find user

        const user = await User.findByIdAndUpdate({ _id: req.body.id });
        // validation user
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        // update user
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        // save user
        await user.save();
        res.status(200).send({
            success: true,
            message: 'User updated Successfully',
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update User API',
        })
    }
}

const updateUserPasswordController = async (req, res) => {
    try {

        // find user
        const user = await User.findById({ _id: req.body.id });
        // validation user
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        // get data from user
        const { oldPassword, newPassword } = req.body;
        // validation user
        if (!oldPassword || !newPassword) {
            return res.status(500).json({
                success: false,
                message: 'Old password and new password are required',
            })
        }
        //compare passwrod
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(404).send({
                success: false,
                message: "Invalid old password"
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();
        res.status(200).send({
            success: true,
            message: 'Password updated successfully',
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Update User Password API',
            error
        })
    }

}

const resetUserPasswordController = async (req, res) => {
    try {
        const { email, newpassword, answer } = req.body;
        if (!email || !newpassword || !answer) {
            return res.status(500).json({
                success: false,
                message: 'Please fill all fields',
            })
        }
        const user = await User.findOne({ email, answer });
        if (!user) {
            return res.status(500).json({
                success: false,
                message: 'User not found or Invalid answer',
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        user.password = hashedPassword;
        // save user
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Password reset Successfully',
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Reset User Password API',
            error
        })
    }

}

module.exports = { getUserController, updateUserController, updateUserPasswordController, resetUserPasswordController }
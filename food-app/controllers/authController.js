const JWT = require("jsonwebtoken")
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;

        if (!userName || !email || !password || !phone || !answer) {
            return res.status(500).send({
                message: "Please fill in all fields"
            })
        }
        //check user
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "User already Registerd Please Login "
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user
        const user = await User.create({
            userName: userName,
            email: email,
            password: hashedPassword,
            phone: phone,
            address: address,
            answer: answer
        })

        res.status(200).send({
            success: true,
            message: "User Registered Successfully",
            user: user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error in Register API"
        })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please fill in all fields"
            })
        }

        // check

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }

        //compare passwrod
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(404).send({
                success: false,
                message: "Invalid Credentials"
            })
        }

        //token create
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "User Login Successfully",
            token: token,
            user,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error in Login API"
        })
    }
}

module.exports = { registerController, loginController }
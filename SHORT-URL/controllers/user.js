const User = require("../model/user")
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid")
const { setuser } = require("../service/auth")


async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
    });
    return res.render("/");
}

async function handleUserLogin(req, res) {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("login", { error: "All fields are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).render("login", { error: "Invalid email or password" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).render("login", { error: "Invalid email or password" });
        }

        const sessionId = uuidv4();
        setuser(sessionId, user);
        res.cookie('uid', sessionId)
        // Redirect if successful
        return res.redirect("/");
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).render("login", { error: "Something went wrong. Try again later." });
    }
}

module.exports = { handleUserSignUp, handleUserLogin };
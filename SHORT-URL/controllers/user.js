const User = require("../model/user")

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
    });
    return res.render("home");
}

module.exports = handleUserSignUp;
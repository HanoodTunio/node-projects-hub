const Router = require("express")
const User = require("../models/user")

const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin")
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Await the promise to resolve the user data
        const token = await User.matchPasswordAndGenerateToken(email, password);

        console.log("token:", token);

        return res.cookie("token", token).redirect("/");
    } catch (error) {
        console.error(error.message);
        return res.render("signin", { error: "Invalid email or password" });
    }
});

router.get("/logout", (req, res) => {
    return res.clearCookie("token").redirect("/")
})


router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({ fullName, email, password });

    return res.redirect("/");
})




module.exports = router;
const Router = require("express")
const Blog = require("../models/blog")

const router = Router()

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});

router.post("/", (req, res) => {
    console.log(req.body)
    return res.redirect("/")
});


module.exports = router
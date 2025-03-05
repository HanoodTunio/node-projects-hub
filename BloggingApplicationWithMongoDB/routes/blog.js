const Router = require("express")
const Blog = require("../models/blog")
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve("./public/uploads/");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});


const upload = multer({ storage: storage });


router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});


router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    return res.render("blog", {
        user: req.user,
        blog: blog,
    });
});


router.post("/", upload.single("coverImage"), async (req, res) => {

    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const { title, body } = req.body;

    try {
        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverImage: `/uploads/${req.file.filename}`,
        });

        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        return res.status(500).send("Error creating blog.");
    }
});



module.exports = router
const Router = require("express")
const Blog = require("../models/blog")
const Comment = require("../models/comment")
const User = require("../models/user"); // ✅ Import the User model
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { blob } = require("stream/consumers");


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
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('createdBy') // Author ko populate karna
            .populate({
                path: 'comments', // Comments fetch karna
                populate: { path: 'createdBy' } // Comment ka author bhi lana
            });

        console.log("Fetched Comments:", blog.comments); // Debugging log

        return res.render("blog", {
            user: req.user,
            blog: blog,
            comments: blog.comments
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return res.status(500).send("Error fetching blog");
    }
});



router.post('/comment/:blogId', async (req, res) => {
    try {
        if (!req.user) return res.status(401).send("Unauthorized");

        // 1️⃣ Find the blog first
        const blog = await Blog.findById(req.params.blogId);
        if (!blog) return res.status(404).send("Blog not found");

        // 2️⃣ Create the comment
        const comment = await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id
        });

        // 3️⃣ Push the comment ID into the blog's comments array
        blog.comments.push(comment._id);
        await blog.save(); // ✅ Save the blog to update comments array

        console.log("New Comment Saved:", comment); // Debugging

        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error adding comment");
    }
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
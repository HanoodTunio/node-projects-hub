require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const checkForAuthenticationCookie = require("./middlewares/authentication");

const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use(express.static(path.resolve('./public')));

// ✅ Set user globally for all views
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Prevents errors when user is not logged in
    next();
});

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(() => console.log("❌ MongoDB connection failed"));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    res.render("home", {
        blogs: allBlogs
    });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const checkForAuthenticationCookie = require("./middlewares/authentication");



const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");


const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
    .then((e) => { console.log("mongo connected") })
    .catch((e) => { console.log("mongo not connected") })

app.get('/', (req, res) => {
    res.render("home", {
        user: req.user
    });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
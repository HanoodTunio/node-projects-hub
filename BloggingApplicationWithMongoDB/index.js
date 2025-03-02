require("dotenv").config();
const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const mongoose = require("mongoose")


const app = express();


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
    .then((e) => { console.log("mongo connected") })
    .catch((e) => { console.log("mongo not connected") })

app.get('/', (req, res) => {
    res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
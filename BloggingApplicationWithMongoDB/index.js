require("dotenv").config();
const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const app = express();


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render("home");
});

app.use("/", userRoute);

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
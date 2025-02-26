const express = require("express");
const path = require("path")
const app = express();


app.set("view engines", "ejs");
app.set('views', path.resolve("./views"));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
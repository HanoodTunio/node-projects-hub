// const http = require("http");
const express = require("express");

const app = express();
//const server = http.createServer(app);// Express is used as a request handler for the HTTP server, so you dont need to write this line


app.get("/", (req, res) => {
    res.send("Hello, This is Home page");
});

app.get("/about", (req, res) => {
    res.send("Hello, this is about page" + ' hey  ' + req.query.name);
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
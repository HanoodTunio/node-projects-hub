const express = require("express");
const UserRouter = require("./routes/user.js");
const connectMongoDb = require("./connection.js");
const Middleware = require("./middlewares/logFunction.js");
const logRequestResponse = require("./middlewares/logFunction.js");


const app = express();
const PORT = 8080;


//connection
connectMongoDb("mongodb://127.0.0.1:27017/Learning-Phase")


// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: false }));

// Middleware for logging
app.use(logRequestResponse('log.txt'));

app.use("/api/users", UserRouter);// Using UserRouter for user routes


// Start the server
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}...`);
});

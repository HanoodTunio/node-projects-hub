const express = require("express");
const app = express();
const connectToDatabase = require("./config/connect");


connectToDatabase();

const userRoute = require("./routes/user")

const PORT = process.env.PORT || 3000;
app.use(express.json());


// Define a simple route
app.get("/", (req, res) => {
    res.send("Hello, World! Server is running.");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

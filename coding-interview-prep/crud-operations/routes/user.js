const express = require("express"); // Import Express correctly
const router = express.Router(); // Use express.Router()

const { createUser } = require("../controllers/user"); // Import controller function

router.post("/create", createUser); // Define POST route

module.exports = router; // Export the router

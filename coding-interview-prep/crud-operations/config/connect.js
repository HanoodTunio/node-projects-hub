const mongoose = require('mongoose');

function connectToDatabase() {
    mongoose.connect("mongodb://127.0.0.1:27017/crud");
    console.log("Mongoose is connected");
}

module.exports = connectToDatabase;
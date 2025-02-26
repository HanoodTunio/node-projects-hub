const mongoose = require('mongoose');


async function connectDB(url) {
    try {
        await mongoose.connect(url)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;


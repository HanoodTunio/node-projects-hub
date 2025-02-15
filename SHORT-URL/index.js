// index.js
const express = require('express');
const urlRoute = require('./routes/url');
const connectDB = require('./connect');

const app = express();
const PORT = 8001;

connectDB('mongodb://127.0.0.1:27017/short-url');

app.use(express.json())
app.use('/url', urlRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

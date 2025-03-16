require('dotenv').config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");


const connectDB = require("./config/connect");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const resturantRoute = require("./routes/resturantRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const foodRoute = require("./routes/foodRoutes");


connectDB(process.env.DB_URL)
const app = express()
//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // ✅ For form data

app.use(morgan('dev'))

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/restsurants', resturantRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/food', foodRoute);

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta);
})
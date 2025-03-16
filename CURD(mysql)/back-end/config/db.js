const mysql = require("mysql2");

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hanood",
    database: "student_db"
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

module.exports = db;

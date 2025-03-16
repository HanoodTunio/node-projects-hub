const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get all students
router.get("/", (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Add a student
router.post("/", (req, res) => {
    const { name, email, age } = req.body;
    const query = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";
    db.query(query, [name, email, age], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Student added successfully", id: result.insertId });
    });
});

// Update a student
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const query = "UPDATE students SET name=?, email=?, age=? WHERE id=?";
    db.query(query, [name, email, age, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Student updated successfully" });
    });
});

// Delete a student
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM students WHERE id=?";
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Student deleted successfully" });
    });
});

module.exports = router;

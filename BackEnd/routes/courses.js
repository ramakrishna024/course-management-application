const express = require("express");
const db = require("../database");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE COURSE (Protected)
router.post("/", authMiddleware, (req, res) => {
  const { name, description, instructor } = req.body;

  if (!name || !description || !instructor) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.run(
    "INSERT INTO courses (name, description, instructor) VALUES (?, ?, ?)",
    [name, description, instructor],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Failed to create course" });
      }
      res.status(201).json({ message: "Course created successfully" });
    }
  );
});

// GET ALL COURSES (Protected)
router.get("/", authMiddleware, (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    res.json(rows);
  });
});

// DELETE COURSE (Protected)
router.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM courses WHERE id = ?", [id], function (err) {
    if (this.changes === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  });
});

module.exports = router;

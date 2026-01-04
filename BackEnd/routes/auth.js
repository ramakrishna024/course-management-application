const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database");

const router = express.Router();

// USER REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email already exists
  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        function (err) {
          if (err) {
            return res.status(500).json({ message: "Registration failed" });
          }

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  );
});

module.exports = router;

const jwt = require("jsonwebtoken");

// USER LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        "secretkey",
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful",
        token
      });
    }
  );
});

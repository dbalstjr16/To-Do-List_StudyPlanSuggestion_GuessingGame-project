const express = require('express');
const router = express.Router();
const db = require("../db");

const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    try {
        // check if email already exists
        db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
            if (err) {
                console.error(`Database query error: ${err}`);
                return res.status(500).json({ success: false, error: "Database query failed" });
            }

            if (user) {
                return res.status(400).json({ success: false, error: "Email is already registered" });
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // insert the user
            db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (error) => {
                if (error) {
                    console.error(`Error inserting user: ${error}`);
                    return res.status(500).json({ success: false, error: "Database insert failed" });
                }

                return res.status(201).json({ success: true, message: "User registered successfully!" });
            });
        });

    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ success: false, error: "Server error" });
    }
});

module.exports = router;

//db.run   CREATE TABLE, INSERT, DELETE, UPDATE
//db.all   SELECT  all rows
//db.get   one row
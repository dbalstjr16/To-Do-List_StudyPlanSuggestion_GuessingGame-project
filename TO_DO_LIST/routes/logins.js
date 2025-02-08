const express = require('express');
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post('/', (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], async (error, user) => {
        if (error) {
            return res.status(500).json({ error: "Database query failed" });
        }
        
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(200).json({ 
                success: true,
                message: "Login successful",
            });
        }

        return res.status(401).json({ success: false, error: "Invalid password" });
    });
});

module.exports = router;

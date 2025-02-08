const express = require('express');
const router = express.Router();
const db = require("../db");

router.post('/', (req, res) => {
    const {email, password} = req.body;
    // Simulating a user database check
    if (email === 'dbalstjr16@gmail.com') {
        res.json({ success: true, 
            message: 'Login successful', 
            token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ success: false, message: `Invalid credentials` });
    }
});

module.exports = router;
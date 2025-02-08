const express = require('express');
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const { email, password } = req.body;

    //store the email in database
    if (!email || !password) {
        res.status(400).json({error: 'did not receive email or password properly'});
    }
    
    //db.run   CREATE TABLE, INSERT, DELETE, UPDATE
    //db.all   SELECT
    
})

module.exports = router;
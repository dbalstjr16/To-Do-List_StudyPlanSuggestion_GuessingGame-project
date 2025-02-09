require("dotenv").config();
const express = require("express");
const cors = require("cors");

const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = require("./db");

// if user visits /tasks or request get on /tasks, we respond by sending data back
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(rows);
        }
    });
});

// if user requests post on /tasks, we add the request into the new data and respond back with success
app.post("/tasks", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task content is required" });
    }

    db.run("INSERT INTO tasks (task) VALUES (?)", [task], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        } else {
            return res.status(201).json({ id: this.lastID, task });
        }
    });
});

app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    
    db.run("DELETE FROM tasks WHERE id = ?", [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        } else if (this.changes === 0) {
            res.status(404).json({ error: "Task not found" });
        } else {
            res.json({ message: "Task deleted" });
        }
    });
});

app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: "Task content is required" });
    }

    db.run("UPDATE tasks SET task = ? WHERE id = ?", [task, id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        } else if (this.changes === 0) {
            res.status(404).json({ error: "Task not found" });
        } else {
            res.json({ message: "Task updated" });
        }
    });
});

const loginRouter = require("./routes/logins.js");
app.use("/login", loginRouter);

const registerRouter = require("./routes/registers.js");
app.use("/register", registerRouter);

const recommendRouter = require("./routes/recommends.js");
app.use("/recommend-course", recommendRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = require("./db");

// ✅ Get All Tasks
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

// ✅ Add a New Task
// if user requests post on /tasks, we add the request into the new data and respond back with success
app.post("/tasks", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task content is required" });
    }

    db.run("INSERT INTO tasks (task) VALUES (?)", [task], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.status(201).json({ id: this.lastID, task });
        }
    });
});

// ✅ Delete a Task by ID
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    
    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
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

// ✅ Update a Task by ID
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: "Task content is required" });
    }

    db.run("UPDATE tasks SET task = ? WHERE id = ?", [task, id], function (err) {
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

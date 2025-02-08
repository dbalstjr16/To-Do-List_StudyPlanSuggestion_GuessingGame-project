require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {Sequelize, DataTypes} = require("sequelize");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
})

const Task = sequelize.define("Tasks", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => console.log("Database synced"));

app.get("/tasks", async (req, res) => {
    const [Tasks] = await sequelize.query("SELECT * FROM Tasks");
    res.json(Tasks);
})

app.post("/tasks", async (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task content is required"});
    }

    const newTask = await Task.create({task});
    res.status(201).json(newTask);
})

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    await Task.destroy({ where: { id }});
    res.json({ message: "Task deleted"});
});

app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    
    if (!task) {
        return res.status(400).json({ error: "Task content is required" });
    }

    await Task.update({ task }, { where: { id } });
    res.json({ message: "Task updated" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
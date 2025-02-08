const sqlite3 = require("sqlite3").verbose();

// ✅ Create a single database connection
const db = new sqlite3.Database("database.sqlite", (err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to SQLite database");
    }
});

// ✅ Create Tasks Table if it Doesn't Exist
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL
    )
`, (err) => {
    if (err) console.error("Error creating table:", err);
    else console.log("Table 'tasks' is ready");
});

// ✅ Export the database connection for reuse
module.exports = db;
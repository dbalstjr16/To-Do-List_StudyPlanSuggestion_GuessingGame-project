const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.sqlite", (err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to SQLite database");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL
    )
`, (err) => {
    if (err) console.error("Error creating table:", err);
    else console.log("Table 'tasks' is ready");
});

db.run("DROP TABLE IF EXISTS users", (error) => {
    if (error) console.log(error);
    else {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                userid INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
            `, (err) => {
            if (err) console.error("Error creating table:", err);
            else console.log("Table 'users' is ready");
        });

    }
})

module.exports = db;
const tasks = require("./routes/tasks");
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const app = express();

// Connect to MySQL database
connection();

app.use(express.json());
app.use(cors());

app.get('/ok', (req, res) => {
    res.status(200).send('ok')
});

// Routes for tasks
const mysql = require('mysql2');

// Connect to MySQL database
const pool = mysql.createPool({
  host: '192.168.61.28',
  user: 'mysql', // Updated MySQL username
  password: 'password123', // Your MySQL password
  database: 'todo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
    const sql = "SELECT * FROM tasks";
    global.mysqlPool.query(sql, (error, results) => {
        if (error) {
            console.error("Error fetching tasks:", error);
            return res.status(500).json({ error: "Failed to fetch tasks" });
        }
        res.json(results);
    });
});

// Create a new task
app.post("/api/tasks", (req, res) => {
    const { title, description } = req.body;
    const sql = "INSERT INTO tasks (title, description) VALUES (?, ?)";
    global.mysqlPool.query(sql, [title, description], (error, result) => {
        if (error) {
            console.error("Error creating task:", error);
            return res.status(500).json({ error: "Failed to create task" });
        }
        res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
    });
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const sql = "DELETE FROM tasks WHERE id = ?";
    global.mysqlPool.query(sql, taskId, (error, result) => {
        if (error) {
            console.error("Error deleting task:", error);
            return res.status(500).json({ error: "Failed to delete task" });
        }
        res.json({ message: "Task deleted successfully" });
    });
});

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}...`));
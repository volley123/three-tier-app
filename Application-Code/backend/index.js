const express = require("express");
const app = express();
const connection = require("./db"); // Assuming connection.js provides the pool

// Environment variable approach (recommended)
require('dotenv').config();

// Connect to MySQL database using environment variables
connection.connect({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})
.then(() => console.log("Connected to MySQL database successfully"))
.catch((err) => {
  console.error("Error connecting to MySQL database:", err);
  process.exit(1); // Exit on connection error
});

// Function to execute a query with prepared statements
const executeQuery = (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        reject(new Error("Database error")); // More generic error for response
      } else {
        resolve(results);
      }
    });
  });
};

// Routes for tasks
app.use(express.json()); // Parses JSON data in the request body

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const sql = "SELECT * FROM tasks";
    const results = await executeQuery(sql, []); // No parameters for this query
    res.json(results);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" }); // Generic error message
  }
});

// Create a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const sql = "INSERT INTO tasks (title, description) VALUES (?, ?)";
    const params = [title, description];
    await executeQuery(sql, params); // Use await for promise resolution
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Task with this title already exists" });
    } else {
      res.status(500).json({ error: "Failed to create task" }); // Generic for other errors
    }
  }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const sql = "DELETE FROM tasks WHERE id = ?";
    const params = [taskId];
    await executeQuery(sql, params);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" }); // Generic for other errors
  }
});

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}...`));
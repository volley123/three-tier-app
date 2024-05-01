// Import the MySQL connection pool
const pool = require('../db');

// Function to get all tasks from MySQL database
const getAllTasks = (callback) => {
    const sql = "SELECT * FROM tasks";
    pool.query(sql, (error, results) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
};

// Function to create a new task in MySQL database
const createTask = (newTask, callback) => {
    const { task, completed } = newTask;
    const sql = "INSERT INTO tasks (task, completed) VALUES (?, ?)";
    pool.query(sql, [task, completed], (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result.insertId);
    });
};

module.exports = {
    getAllTasks,
    createTask
};
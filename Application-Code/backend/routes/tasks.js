const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Import MySQL model functions
const { getAllTasks, createTask } = require("../models/tasks");

// Create a new task
router.post("/", (req, res) => {
    const newTask = req.body;
    createTask(newTask, (error, taskId) => {
        if (error) {
            res.status(500).json({ error: "Failed to create task" });
            return;
        }
        res.status(201).json({ message: "Task created successfully", taskId });
    });
});

// Get all tasks
router.get("/", (req, res) => {
    getAllTasks((error, tasks) => {
        if (error) {
            res.status(500).json({ error: "Failed to fetch tasks" });
            return;
        }
        res.json(tasks);
    });
});

// Update a task
router.put("/:id", (req, res) => {
    // Update task code
});

// Delete a task
router.delete("/:id", (req, res) => {
    // Delete task code
});

module.exports = router;
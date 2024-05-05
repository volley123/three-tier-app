import React, { useState } from "react";
import Tasks from "./Tasks"; // Assuming Tasks is an empty component or not used
import { Paper, TextField, Checkbox, Button } from "@material-ui/core";
import "./App.css"; // Update your CSS file accordingly

function App() {
  const [tasks, setTasks] = useState([]); // Use useState for state management
  const [currentTask, setCurrentTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const newTask = { task: currentTask, completed: false, id: Math.floor(Math.random() * 10000) }; // Generate a random ID (improve for production)
    setTasks([...tasks, newTask]);
    setCurrentTask("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>My To-Do List</h1>
      </header>
      <div className="main-content">
        <Paper elevation={3} className="todo-container">
          <form onSubmit={handleSubmit} className="task-form">
            <TextField
              variant="outlined"
              size="small"
              className="task-input"
              value={currentTask}
              required={true}
              onChange={(event) => setCurrentTask(event.target.value)}
              placeholder="Add New TO-DO"
            />
            <Button className="add-task-btn" color="primary" variant="outlined" type="submit">
              Add Task
            </Button>
          </form>
          <div className="tasks-list">
            {tasks.map((task) => (
              <Paper key={task.id} className="task-item">
                <Checkbox
                  checked={task.completed}
                  onClick={() => {
                    const updatedTasks = tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t));
                    setTasks(updatedTasks);
                  }}
                  color="primary"
                />
                <div className={task.completed ? "task-text completed" : "task-text"}>
                  {task.task}
                </div>
                <Button onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))} color="secondary" className="delete-task-btn">
                  Delete
                </Button>
              </Paper>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default App;

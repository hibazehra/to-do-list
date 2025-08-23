import React, { useState, useEffect } from "react";
import "./App.css";

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
   // Load from localStorage on first render
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Create / Update Task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    if (editId) {
      setTodos((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, text: task } : t))
      );
      setEditId(null);
    } else {
      const newTask = { id: Date.now(), text: task, completed: false };
      setTodos((prev) => [...prev, newTask]);
    }
    setTask("");
  };

  // Delete Task
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // Edit Task
  const handleEdit = (id) => {
    const t = todos.find((todo) => todo.id === id);
    setTask(t.text);
    setEditId(id);
  };

  // Toggle Complete
  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="container">
      <h1>My Todo List</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="list">
        {todos.map((t) => (
          <li key={t.id} className={`listItem ${t.completed ? "done" : ""}`}>
            <span onClick={() => handleToggle(t.id)}>{t.text}</span>
            <div>
              <button onClick={() => handleEdit(t.id)} className="editBtn">
                Edit
              </button>
              <button onClick={() => handleDelete(t.id)} className="deleteBtn">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

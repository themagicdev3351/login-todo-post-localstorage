// src/Todo.js
import React, { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  // Add new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!task) return;
    
    const newTodo = { id: Date.now(), task };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));  
    setTask("");
  };

  // Delete a todo
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
  };

  // Edit a todo
  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setTask(todo.task);
  };

  // Update an existing todo
  const handleUpdateTodo = (e) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo) =>
      todo.id === currentTodo.id ? { ...todo, task } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update localStorage
    setTask("");
    setIsEditing(false);
    setCurrentTodo(null);
  };

  return (
    <div className="container">
      <h2>Todo List</h2>
      <form onSubmit={isEditing ? handleUpdateTodo : handleAddTodo}>
        <div className="form-group">
          <label>Task:</label>
          <input
            type="text"
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.task}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditTodo(todo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Todo;

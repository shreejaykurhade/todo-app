// pages/HomePage.jsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IoClipboardOutline } from "react-icons/io5";
import AddTodoForm from "../components/AddToDoForm";
import TodoItem from "../components/TodoItem";
import TodoStats from "../components/TodoStats";

function HomePage() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      const response = await axios.post("/api/todos", { text });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const saveEdit = async (id, newText) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: newText,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Stay organized and get things done
          </p>
        </div>

        {/* Add Task Form */}
        <AddTodoForm onAddTodo={addTodo} />

        {/* Tasks Grid */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <IoClipboardOutline className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-400">Add your first task to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onEdit={saveEdit}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <TodoStats todos={todos} />
      </div>
    </div>
  );
}

export default HomePage;
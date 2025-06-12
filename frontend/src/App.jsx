"use client"

import { useEffect, useState } from "react"
import { MdOutlineDone } from "react-icons/md"
import { IoClose } from "react-icons/io5"
import { MdModeEditOutline } from "react-icons/md"
import { FaTrash } from "react-icons/fa6"
import { IoClipboardOutline } from "react-icons/io5"
import axios from "axios"

function App() {
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)
  const [editedText, setEditedText] = useState("")

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    try {
      const response = await axios.post("/api/todos", { text: newTodo })
      setTodos([...todos, response.data])
      setNewTodo("")
    } catch (error) {
      console.log("Error adding todo:", error)
    }
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos")
      console.log(response.data)
      setTodos(response.data)
    } catch (error) {
      console.log("Error fetching todos:", error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const startEditing = (todo) => {
    setEditingTodo(todo._id)
    setEditedText(todo.text)
  }

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      })
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)))
      setEditingTodo(null)
    } catch (error) {
      console.log("Error updating todo:", error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.log("Error deleting todo:", error)
    }
  }

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id)
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      })
      setTodos(todos.map((t) => (t._id === id ? response.data : t)))
    } catch (error) {
      console.log("Error toggling todo:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600 text-sm sm:text-base">Stay organized and get things done</p>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-3">
            <input
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks Grid */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <IoClipboardOutline className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet</h3>
              <p className="text-gray-400">Add your first task to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border-l-4 ${
                    todo.completed ? "border-green-500 bg-green-50" : "border-blue-500"
                  }`}
                >
                  {editingTodo === todo._id ? (
                    <div className="space-y-4">
                      <input
                        className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 transition-all duration-200"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                        >
                          <MdOutlineDone className="text-lg" />
                          Save
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2"
                          onClick={() => setEditingTodo(null)}
                        >
                          <IoClose className="text-lg" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTodo(todo._id)}
                          className={`flex-shrink-0 h-6 w-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                          }`}
                        >
                          {todo.completed && <MdOutlineDone className="text-sm" />}
                        </button>
                        <p
                          className={`flex-1 text-sm sm:text-base font-medium leading-relaxed ${
                            todo.completed ? "text-gray-500 line-through" : "text-gray-800"
                          }`}
                        >
                          {todo.text}
                        </p>
                      </div>

                      <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
                        <button
                          className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-all duration-200"
                          onClick={() => startEditing(todo)}
                          title="Edit task"
                        >
                          <MdModeEditOutline className="text-lg" />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-all duration-200"
                          title="Delete task"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{todos.length}</div>
                <div className="text-sm text-blue-600 font-medium">Total Tasks</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{todos.filter((todo) => todo.completed).length}</div>
                <div className="text-sm text-green-600 font-medium">Completed</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {todos.filter((todo) => !todo.completed).length}
                </div>
                <div className="text-sm text-orange-600 font-medium">Pending</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

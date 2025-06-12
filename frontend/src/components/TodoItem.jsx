// components/TodoItem.jsx
"use client";

import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [editingTodo, setEditingTodo] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSaveEdit = () => {
    onEdit(todo._id, editedText);
    setEditingTodo(false);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border-l-4 ${
        todo.completed ? "border-green-500 bg-green-50" : "border-blue-500"
      }`}
    >
      {editingTodo ? (
        <div className="space-y-4">
          <input
            className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 transition-all duration-200"
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
            >
              <MdOutlineDone className="text-lg" />
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2"
              onClick={() => setEditingTodo(false)}
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
              onClick={() => onToggle(todo._id)}
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
              onClick={() => setEditingTodo(true)}
              title="Edit task"
            >
              <MdModeEditOutline className="text-lg" />
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-all duration-200"
              title="Delete task"
            >
              <FaTrash className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
// components/TodoStats.jsx
"use client";

function TodoStats({ todos }) {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (totalTasks === 0) {
    return null; // Don't render stats if there are no todos
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
          <div className="text-sm text-blue-600 font-medium">Total Tasks</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {completedTasks}
          </div>
          <div className="text-sm text-green-600 font-medium">Completed</div>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {pendingTasks}
          </div>
          <div className="text-sm text-orange-600 font-medium">Pending</div>
        </div>
      </div>
    </div>
  );
}

export default TodoStats;
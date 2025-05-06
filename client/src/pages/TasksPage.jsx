import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

export function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Task Dashboard</h1>
          <p className="text-gray-400">Manage and organize your tasks efficiently</p>
        </div>
        <Link to="/add-task" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg 
            flex items-center gap-2 transition-colors">
          <IoMdAdd className="text-xl" />
          Add Task
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Total Tasks</h3>
          <p className="text-2xl font-bold text-white">{tasks.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Completed Tasks</h3>
          <p className="text-2xl font-bold text-white">
            {tasks.filter(task => task.completed).length}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Pending Tasks</h3>
          <p className="text-2xl font-bold text-white">
            {tasks.filter(task => !task.completed).length}
          </p>
        </div>
      </div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-white mb-2">No tasks yet</h2>
          <p className="text-gray-400 mb-4">Start by creating a new task</p>
          <Link to="/add-task" 
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 
              text-white px-6 py-3 rounded-lg transition-colors">
            <IoMdAdd className="text-xl" />
            Create Task
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      )}
    </div>
  );
}

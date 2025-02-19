import { useTasks } from "../../context/tasksContext";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiClock } from "react-icons/fi";
import dayjs from "dayjs";

export function TaskCard({ task }) {
  const { deleteTask, toggleTaskStatus } = useTasks();

  const handleToggleStatus = async (e) => {
    e.preventDefault();
    try {
      await toggleTaskStatus(task._id);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const isOverdue = task.date && !task.completed && dayjs(task.date).isBefore(dayjs(), 'day');

  const getStatusBadge = () => {
    if (task.completed) {
      return {
        text: "Completed",
        className: "bg-green-500/10 text-green-500"
      };
    }
    if (isOverdue) {
      return {
        text: "Overdue",
        className: "bg-red-500/10 text-red-500"
      };
    }
    return {
      text: "Pending",
      className: "bg-yellow-500/10 text-yellow-500"
    };
  };

  const badge = getStatusBadge();

  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-semibold text-white ${
            task.completed ? 'line-through' : ''
          }`}>
            {task.title}
          </h3>
          <div className="flex gap-2 items-center">
            {isOverdue && !task.completed && (
              <FiClock className="text-red-500 w-4 h-4" />
            )}
            <span className={`px-2 py-1 rounded text-xs font-medium ${badge.className}`}>
              {badge.text}
            </span>
          </div>
        </div>
        
        <p className={`text-gray-400 mb-6 line-clamp-2 ${
          task.completed ? 'line-through' : ''
        }`}>
          {task.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className={`text-sm ${isOverdue ? 'text-red-400' : 'text-gray-500'}`}>
            {dayjs(task.date).format('DD/MM/YYYY')}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleToggleStatus}
              className={`p-2 rounded-full transition-colors ${
                task.completed 
                  ? "text-yellow-500 hover:bg-yellow-500/10"
                  : "text-green-500 hover:bg-green-500/10"
              }`}
            >
              {task.completed ? <FiX className="w-5 h-5" /> : <FiCheck className="w-5 h-5" />}
            </button>
            <Link 
              to={`/tasks/${task._id}`} 
              className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors"
            >
              <FiEdit2 className="w-5 h-5" />
            </Link>
            <button
              onClick={() => deleteTask(task._id)}
              className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

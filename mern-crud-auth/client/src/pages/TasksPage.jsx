import { useEffect, useContext } from 'react';
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import StatsOverview from '../components/StatsOverview';
import TaskFilters from '../components/TaskFilters';
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + New Task
        </button>
      </div>

      <StatsOverview />
      <TaskFilters />

      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

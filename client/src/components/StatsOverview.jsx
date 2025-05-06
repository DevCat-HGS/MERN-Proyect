import { FaTasks, FaCheckCircle, FaClock, FaCalendarAlt } from 'react-icons/fa';

function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FaTasks className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <h3 className="text-2xl font-bold text-gray-900">24</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-lg">
            <FaCheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Completed</p>
            <h3 className="text-2xl font-bold text-gray-900">16</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <FaClock className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Pending</p>
            <h3 className="text-2xl font-bold text-gray-900">8</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 rounded-lg">
            <FaCalendarAlt className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Due Today</p>
            <h3 className="text-2xl font-bold text-gray-900">3</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsOverview; 
import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/Task';

interface TaskListProps {
  searchTerm: string;
  statusFilter: string;
}

export const TaskList: React.FC<TaskListProps> = ({ searchTerm, statusFilter }) => {
  const { state, dispatch } = useTaskContext();

  const filteredTasks = state.tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (task: Task) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, status: 'Completed' },
    });
  };

  const handleDelete = (taskId: string) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  if (state.loading) {
    return <div className="text-center">Loading tasks...</div>;
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-medium">{task.title}</h3>
            <p className="text-gray-500">{task.description}</p>
            <div className="mt-2 space-x-2">
              <span className={`px-2 py-1 rounded text-sm ${
                task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.status}
              </span>
              <span className={`px-2 py-1 rounded text-sm ${
                task.priority === 'High' ? 'bg-red-100 text-red-800' :
                task.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.priority}
              </span>
            </div>
          </div>
          <div className="space-x-2">
            {task.status === 'Pending' && (
              <button
                onClick={() => handleStatusUpdate(task)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Complete
              </button>
            )}
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

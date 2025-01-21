import React, { useEffect, useState } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { useTaskContext } from '../context/TaskContext';
import { fetchTasks } from '../services/api';

export const Dashboard: React.FC = () => {
  const { dispatch } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const loadTasks = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const tasks = await fetchTasks();
        dispatch({ type: 'SET_TASKS', payload: tasks });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load tasks' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    loadTasks();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Task Management Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <TaskForm />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <TaskList searchTerm={searchTerm} statusFilter={statusFilter} />
      </div>
    </div>
  );
};
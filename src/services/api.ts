import { Task } from '../types/Task';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  const data = await response.json();
  return data.map((todo: any) => ({
    id: todo.id.toString(),
    title: todo.title,
    description: '',
    status: todo.completed ? 'Completed' : 'Pending',
    priority: 'Medium', // Default priority since API doesn't provide this
  }));
};
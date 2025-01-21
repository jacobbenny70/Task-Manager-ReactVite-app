export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'Pending' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
  }
  
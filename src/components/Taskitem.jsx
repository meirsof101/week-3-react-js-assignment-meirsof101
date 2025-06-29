import React from 'react';
import { Button } from './Button';

export const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
          {task.text}
        </span>
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </Button>
    </div>
  );
};
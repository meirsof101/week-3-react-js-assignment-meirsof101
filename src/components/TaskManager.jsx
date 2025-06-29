import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../context/ThemeContext';
import { Button } from './Button';
import { Card } from './Card';
import { TaskItem } from './Taskitem';

export const TaskManager = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    console.log('TaskManager mounted. Tasks loaded:', tasks.length);
  }, []);

  useEffect(() => {
    console.log('Tasks updated. Total tasks:', tasks.length);
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks(prev => [...prev, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const taskStats = {
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Task Manager
          </h1>
          <Button
            variant="secondary"
            onClick={toggleTheme}
            className="flex items-center space-x-2"
          >
            <span>{isDarkMode ? '☀️' : '🌙'}</span>
            <span>{isDarkMode ? 'Light' : 'Dark'} Mode</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Tasks</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{taskStats.active}</div>
              <div className="text-gray-600 dark:text-gray-400">Active Tasks</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
              <div className="text-gray-600 dark:text-gray-400">Completed</div>
            </div>
          </Card>
        </div>

        {/* Add Task Form */}
        <Card className="mb-8">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            />
            <Button onClick={addTask} disabled={!newTask.trim()}>
              Add Task
            </Button>
          </div>
        </Card>

        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-6">
          {['all', 'active', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'primary' : 'secondary'}
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType} ({
                filterType === 'all' ? taskStats.total :
                filterType === 'active' ? taskStats.active :
                taskStats.completed
              })
            </Button>
          ))}
        </div>

        {/* Task List */}
        <Card>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {filter === 'all' ? 'No tasks yet. Add your first task above!' :
               filter === 'active' ? 'No active tasks. Great job!' :
               'No completed tasks yet. Get started!'}
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {filter === 'all' ? 'All Tasks' :
                 filter === 'active' ? 'Active Tasks' :
                 'Completed Tasks'} ({filteredTasks.length})
              </h2>
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          )}
        </Card>

        {/* Debug Info */}
        <Card className="mt-8 border-dashed border-gray-300">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Debug Info (Hooks in Action)
          </h3>
          <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
            <div>• useState: Managing {tasks.length} tasks and '{filter}' filter</div>
            <div>• useEffect: Auto-saving to localStorage on every change</div>
            <div>• useContext: Theme is {isDarkMode ? 'dark' : 'light'} mode</div>
            <div>• useLocalStorage (custom): Persisting tasks and theme preference</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
import React from 'react';

export const Card = ({ children, className = '' }) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700';
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useTheme } from '../context/ThemeContext';
// Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
// Theme Switcher Button Component
const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <div className={`absolute inset-0 transform transition-all duration-500 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
          <div className="w-6 h-6 text-yellow-500">
            ☀️
          </div>
        </div>
        
        {/* Moon Icon */}
        <div className={`absolute inset-0 transform transition-all duration-500 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}>
          <div className="w-6 h-6 text-blue-400">
            🌙
          </div>
        </div>
      </div>
    </button>
  );
};

// Enhanced Button Component with animations
const AnimatedButton = ({ children, variant = 'primary', size = 'md', onClick, disabled = false, ...props }) => {
  const baseClasses = "relative overflow-hidden font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    secondary: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:ring-gray-500",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} group`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Ripple effect */}
      <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:animate-ping group-hover:opacity-20 rounded-lg"></span>
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </button>
  );
};

// Enhanced Card Component
const AnimatedCard = ({ children, className = "", hover = true, ...props }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-out
        ${hover ? 'hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 dark:hover:border-blue-800' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <div className="flex space-x-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Enhanced Navigation Bar
const EnhancedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ReactApp
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Home
            </a>
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              About
            </a>
            <a href="/posts" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Posts
            </a>
            <a href="/tasks" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Tasks
            </a>
            <ThemeSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className={`w-6 h-6 flex flex-col justify-center items-center transform transition-all duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${isMenuOpen ? 'rotate-90 translate-y-1.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mt-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mt-1 transform transition-all duration-300 ${isMenuOpen ? '-rotate-90 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-4">
            <a href="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Home
            </a>
            <a href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              About
            </a>
            <a href="/posts" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Posts
            </a>
            <a href="/tasks" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Tasks
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Demo Component showcasing all features
const StyledComponentsDemo = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <EnhancedNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Task 5 Complete! 🎉
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced Tailwind CSS styling with responsive design, dark mode theming, 
            custom animations, and beautiful UI components.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Theme Switcher Feature */}
          <AnimatedCard className="p-8 text-center">
            <div className="text-4xl mb-4">🌓</div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Dark Mode Toggle</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Smooth theme switching with system preference detection and localStorage persistence.
            </p>
            <div className="flex justify-center">
              <ThemeSwitcher />
            </div>
          </AnimatedCard>

          {/* Responsive Design Feature */}
          <AnimatedCard className="p-8 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Responsive Design</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Mobile-first approach with breakpoints for tablet and desktop layouts.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">Mobile</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">Tablet</span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">Desktop</span>
            </div>
          </AnimatedCard>

          {/* Animations Feature */}
          <AnimatedCard className="p-8 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Custom Animations</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Smooth transitions, hover effects, and micro-interactions for enhanced UX.
            </p>
            <div className="animate-bounce inline-block">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></div>
            </div>
          </AnimatedCard>
        </div>

        {/* Button Showcase */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Enhanced Button Components
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatedButton variant="primary" size="md">
              Primary Button
            </AnimatedButton>
            <AnimatedButton variant="secondary" size="md">
              Secondary Button  
            </AnimatedButton>
            <AnimatedButton variant="success" size="md">
              Success Button
            </AnimatedButton>
            <AnimatedButton variant="danger" size="md">
              Danger Button
            </AnimatedButton>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <AnimatedButton variant="primary" size="sm">Small</AnimatedButton>
            <AnimatedButton variant="primary" size="md">Medium</AnimatedButton>
            <AnimatedButton variant="primary" size="lg">Large</AnimatedButton>
            <AnimatedButton variant="primary" size="xl">Extra Large</AnimatedButton>
          </div>
        </div>

        {/* Loading Demo */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Loading States & Skeleton UI
          </h2>
          
          <div className="text-center mb-8">
            <AnimatedButton variant="primary" onClick={handleLoadingDemo} disabled={loading}>
              {loading ? "Loading..." : "Demo Loading State"}
            </AnimatedButton>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-300">
              Click the button above to see the loading skeleton animation in action!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300">
            🎯 <strong>Task 5 Complete!</strong> - Advanced Tailwind CSS styling with modern design patterns
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Week 3 React.js Assignment - All tasks completed! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default StyledComponentsDemo;
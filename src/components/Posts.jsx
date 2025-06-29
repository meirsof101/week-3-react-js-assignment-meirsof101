import React, { useState, useEffect } from 'react';

// Custom hook for API data fetching
const useApiData = (url, page = 1, searchTerm = '') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API delay for better UX demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Filter data based on search term
        let filteredData = result;
        if (searchTerm) {
          filteredData = result.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        }
        
        setTotalCount(filteredData.length);
        
        // Implement pagination (10 items per page)
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        setData(filteredData.slice(startIndex, endIndex));
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page, searchTerm]);

  return { data, loading, error, totalCount };
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    <span className="ml-2 text-gray-600 dark:text-gray-300">Loading posts...</span>
  </div>
);

// Error component
const ErrorMessage = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="h-12 w-12 text-red-500 mb-4 text-4xl">⚠️</div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      Oops! Something went wrong
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      {error}
    </p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Post card component
const PostCard = ({ post }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-start justify-between mb-3">
      <div className="flex flex-wrap gap-2">
        {post.tag_list?.slice(0, 2).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(post.published_at).toLocaleDateString()}
      </span>
    </div>
    
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
      {post.title}
    </h3>
    
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-4">
      {post.description || 'No description available...'}
    </p>
    
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <img 
          src={post.user?.profile_image_90 || `https://ui-avatars.com/api/?name=${post.user?.name}&background=6366f1&color=fff`}
          alt={post.user?.name}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {post.user?.name || 'Anonymous'}
        </span>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <span>❤️ {post.public_reactions_count || 0}</span>
        <span>💬 {post.comments_count || 0}</span>
      </div>
    </div>
    
    <div className="mt-4">
      <a 
        href={post.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors"
      >
        Read Full Article →
      </a>
    </div>
  </div>
);

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center space-x-2 mt-8">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      ← Previous
    </button>
    
    <div className="flex space-x-1">
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              currentPage === page
                ? 'text-blue-600 bg-blue-50 border border-blue-300 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
    
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      Next →
    </button>
  </div>
);

// Main API Integration component
const ApiIntegration = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: posts, loading, error, totalCount } = useApiData(
    'https://dev.to/api/articles',
    currentPage,
    debouncedSearchTerm
  );

  const totalPages = Math.ceil(totalCount / 10);

  const handleRetry = () => {
    window.location.reload();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Tech Articles
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest articles from DEV Community. Real content from real developers 
            about programming, web development, and technology.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="h-5 w-5 text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search articles by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Results Summary */}
        {!loading && !error && (
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {debouncedSearchTerm ? (
                <>
                  Found <span className="font-semibold">{totalCount}</span> results for "
                  <span className="font-semibold">{debouncedSearchTerm}</span>"
                </>
              ) : (
                <>
                  Showing <span className="font-semibold">{totalCount}</span> latest articles
                </>
              )}
            </p>
          </div>
        )}

        {/* Content */}
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage error={error} onRetry={handleRetry} />}
        
        {!loading && !error && posts.length === 0 && debouncedSearchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No articles found matching "{debouncedSearchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
        
        {!loading && !error && posts.length > 0 && (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApiIntegration;
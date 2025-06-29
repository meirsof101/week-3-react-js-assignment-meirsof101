import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './Button';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
  }

  const handleTaskManager = () => {
    navigate('/tasks');
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              MyApp
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/about')}`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/contact')}`}
              >
                Contact
              </Link>
              <Link
                to="/posts"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/posts')}`}
              >
                Posts
              </Link>
              <Link
                to="/demo"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/demo')}`}
              >
                Demo
              </Link>
              <div className="flex items-center">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleTaskManager}
                >
                  📋 Task Manager
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
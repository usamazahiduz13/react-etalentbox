import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashBoardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const primaryColor = '#14589C';
  const navigate = useNavigate();

  // Placeholder for authentication state
  const isAuthenticated = true;

  const handleLogout = () => {
    // Implement your logout logic here
    // Example: dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold" style={{ color: primaryColor }}>
            E-Talent
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Jobs</Link>
            <Link to="/companies" className="text-gray-700 hover:text-blue-600">Companies</Link>
            <Link to="/resources" className="text-gray-700 hover:text-blue-600">Resources</Link>
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-700">{isAuthenticated.name?.charAt(0) || 'U'}</span>
                  </div>
                  <span className="text-gray-700">{isAuthenticated.name || 'User'}</span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md text-white hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md focus:outline-none"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Jobs</Link>
              <Link to="/companies" className="text-gray-700 hover:text-blue-600">Companies</Link>
              <Link to="/resources" className="text-gray-700 hover:text-blue-600">Resources</Link>
            </nav>
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="block py-2 text-gray-700 hover:text-blue-600">Profile</Link>
                  <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 rounded-md text-white text-center hover:opacity-90"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashBoardNavbar; 
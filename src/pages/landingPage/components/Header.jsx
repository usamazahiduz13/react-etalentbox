import React, { useState } from 'react';
import Logo from '../../../assets/imgs/logo.png';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Import hamburger and close icons

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full bg-[#F5F7FA]">
      <div className="flex justify-between items-center py-5 md:px-8 lg:px-16 px-4 max-w-[1280px] mx-auto">
        <Link to="/">
          <img src={Logo} alt="eTalentBox Logo" className="h-8 md:h-10" />
        </Link>
        
        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/portal/jobs" className="text-blue-600 font-medium no-underline hover:text-blue-800 transition-colors">
            Find Jobs
          </Link>
          
          <div className="flex space-x-4">
            <Link to="auth/login">
              <button className='bg-transparent border border-blue-500 px-4 py-2 rounded-[16px] cursor-pointer hover:bg-blue-50 transition-colors'>
                Login
              </button>
            </Link>
            <Link to="auth/register">
              <button className='primary-button'>Register</button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu button - visible only on mobile */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu - appears when hamburger is clicked */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/portal/jobs" 
              className="text-blue-600 font-medium no-underline hover:text-blue-800 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            
            <div className="flex flex-col space-y-4 pt-2">
              <Link to="auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className='w-full bg-transparent border border-blue-500 px-4 py-2 rounded-[16px] cursor-pointer hover:bg-blue-50'>
                  Login
                </button>
              </Link>
              <Link to="auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                <button className='w-full primary-button'>Register</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
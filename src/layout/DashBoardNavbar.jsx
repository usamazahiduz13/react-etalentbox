import React, { useState, useRef, useEffect } from "react";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from '../assets/logo.svg'
import { clearStoredAuthData } from '../services/auth';
import { toggleAuth } from '../Redux/auth-slice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, isLogin } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      clearStoredAuthData();
      dispatch(toggleAuth({ isLogin: false, userInfo: null }));
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-[#14589C] text-white">
      <div className="lg:px-16 md:px-8 mx-auto px-4 md:y-6 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span className=" text-xl text-white font-bold">e talent</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-base">
          <Link to="/dashboard">Overview</Link>
          <Link to="/find-jobs">Find Job</Link>
          <Link href="#">Applications</Link>
          <Link href="#">News</Link>
          <div className="flex items-center space-x-1">
            <span>EN</span>
            <span>|</span>
            <span>FR</span>
          </div>
          <IoMdSettings className="w-5 h-5 cursor-pointer" />
          <BiSolidMessageSquareDots className="w-5 h-5 cursor-pointer" />
          <FaBell className="w-5 h-5 cursor-pointer" />
          
          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <div 
              className="w-8 h-8 bg-gray-400 rounded-full cursor-pointer overflow-hidden"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              {profile?.artifactUrl ? (
                <img 
                  src={profile.artifactUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <FiUser className="text-gray-600" />
                </div>
              )}
            </div>
            
            {/* Dropdown menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <FiLogOut className="mr-2" />
                      Logout
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden px-4 pb-4 bg-[#14589C]`}>
        <div className="flex flex-col space-y-2 text-base font-medium">
          <Link to="/dashboard">Overview</Link>
          <Link to="/find-jobs">Find Job</Link>
          <Link href="#">Applications</Link>
          <Link href="#">News</Link>
          <div className="flex items-center space-x-2">
            <span>EN</span>
            <span>|</span>
            <span>FR</span>
          </div>
          <div className="flex space-x-4 mt-2">
            <IoMdSettings className="w-5 h-5" />
            <BiSolidMessageSquareDots className="w-5 h-5" />
            <FaBell className="w-5 h-5" />
            <div className="w-8 h-8 bg-gray-400 rounded-full" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-white hover:text-red-200 py-2"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

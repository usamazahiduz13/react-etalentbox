import React, { useState } from "react";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
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
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/find-jobs">Find Job</Link>
          <Link href="#">Applications</Link>
          <Link href="#">News</Link>
          <div className="flex items-center space-x-1">
            <span>EN</span>
            <span>|</span>
            <span>FR</span>
          </div>
          <IoMdSettings className="w-5 h-5" />
          <BiSolidMessageSquareDots className="w-5 h-5" />
          <FaBell className="w-5 h-5" />
          <div className="w-8 h-8 bg-gray-400 rounded-full" />
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
          <a href="#">Overview</a>
          <a href="#">Find Job</a>
          <a href="#">Applications</a>
          <a href="#">News</a>
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
        </div>
      </div>
    </header>
  );
};

export default Header;

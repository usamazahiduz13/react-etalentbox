import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import notFoundAnimation from '../assets/animation/404.json';
import Lottie from 'lottie-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center px-4">
      <div className="max-w-[1280px] mx-auto text-center">
        <div className="w-full max-w-md mx-auto mb-8">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          <span className="text-blue-600">Oops!</span> Page Not Found
        </h1>
        
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-[16px] hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft />
            Back to Home
          </Link>
          
          <Link 
            to="/find-jobs" 
            className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded-[16px] hover:bg-blue-50 transition-colors"
          >
            Find Jobs
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ userData, onEditProfile }) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative rounded-lg overflow-hidden bg-white shadow-sm mb-6">
      {/* Banner with gradient background */}
      <div className="h-32 bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-600 relative">
        <button 
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30"
          onClick={() => onEditProfile('banner')}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      
      <div className="px-6 pb-6 pt-16 relative">
        {/* Profile picture */}
        <div className="absolute -top-14 left-6">
          <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden relative">
            {userData?.artifactUrl ? (
              <img 
                src={userData.artifactUrl} 
                alt={`${userData?.firstName || ''} ${userData?.lastName || ''}`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-4xl text-gray-500 uppercase">
                {userData?.firstName?.charAt(0) || ''}{userData?.lastName?.charAt(0) || ''}
              </div>
            )}
            <button 
              className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center"
              onClick={() => onEditProfile('photo')}
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Profile info */}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {userData?.firstName || 'William'} {userData?.lastName || 'James'}
              </h1>
              <button 
                className="ml-2 w-6 h-6 text-blue-600"
                onClick={() => onEditProfile('info')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-600">{userData?.profileLevel || 'Product Designer at Twitter'}</p>
            <div className="flex items-center text-gray-500 mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{userData?.city || 'Manchester'}, {userData?.workCountry || 'UK'}</span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={() => navigate("/dashboard/add-details")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* About section */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">About me</h2>
            <button 
              className="w-6 h-6 text-blue-600"
              onClick={() => onEditProfile('about')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            {userData?.overview?.overviewDetail || 
              "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialized in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 
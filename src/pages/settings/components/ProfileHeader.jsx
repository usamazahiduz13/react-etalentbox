import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import fetchApi from "../../../utils/axios";
import { toast } from "sonner";
import { updateUserData } from '../../../Redux/auth-slice';

const ProfileHeader = ({  onEditProfile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, userData } = useSelector((state) => state.auth);
  
  // User overview/bio state
  const [userOverview, setUserOverview] = useState({ overviewDetail: "" });
  const [isEditingOverview, setIsEditingOverview] = useState(false);
  const [editedOverview, setEditedOverview] = useState("");
  const [loadingOverview, setLoadingOverview] = useState(false);
  
  // User overview functions
  const getUserOverview = async () => {
    if (!userInfo?.userId) {
      toast.error("User information not found. Please log in again.");
      return;
    }

    setLoadingOverview(true);
    try {
      const res = await fetchApi.get(`/Overview?userId=${userInfo.userId}`);
      if (res.data.success) {
        dispatch(updateUserData({ overview: res.data.data }));
        setUserOverview(res.data.data || { overviewDetail: "" });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching user overview:", error);
      // Handle case when no overview exists yet
      if (error.response?.status === 404) {
        console.log("No overview found, will create new one on submission");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load user overview"
        );
      }
    } finally {
      setLoadingOverview(false);
    }
  };

  // Use useEffect to update local state when Redux state changes
  useEffect(() => {
    if (userData?.overview) {
      setUserOverview(userData.overview);
    }
  }, [userData?.overview]);


  const handleEditOverview = () => {
    setEditedOverview(userOverview.overviewDetail || "");
    setIsEditingOverview(true);
  };

  const handleSaveOverview = async () => {
    if (!userInfo?.userId) {
      toast.error("User information not found. Please log in again.");
      return;
    }

    setLoadingOverview(true);
    try {
      const payload = {
        overviewDetail: editedOverview,
        userId: userInfo.userId,
        id: userOverview.id || 0
      };

      // Determine if it's an update or create operation
      const method = userOverview.id ? "put" : "post";
      const endpoint = "/Overview";

      const response = await fetchApi[method](endpoint, payload);
      
      if (response.data.success) {
        toast.success("Bio updated successfully");
        // Update the local state with the new data
        const updatedOverview = {
          overviewDetail: editedOverview,
          userId: userInfo.userId,
          id: response.data.data?.id || userOverview.id || 0
        };
        
        // Update both local state and Redux
        setUserOverview(updatedOverview);
        dispatch(updateUserData({ overview: updatedOverview }));
      } else {
        toast.error(response.data.message || "Failed to update bio");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      toast.error(error.response?.data?.message || "Failed to update bio");
    } finally {
      setLoadingOverview(false);
      setIsEditingOverview(false);
    }
  };
  
  useEffect(() => {
    getUserOverview();
  }, [userInfo]);
  
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
            {userData?.info?.artifactUrl ? (
              <img 
                src={userData.info.artifactUrl} 
                alt={`${userData?.info?.firstName || ''} ${userData?.info?.lastName || ''}`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-4xl text-gray-500 uppercase">
                {userData?.info?.firstName?.charAt(0) || ''}{userData?.info?.lastName?.charAt(0) || ''}
              </div>
            )}
            <div 
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
            </div>
          </div>
        </div>
        
        {/* Profile info */}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {userData?.info?.firstName || 'William'} {userData?.info?.lastName || 'James'}
              </h1>
              <div 
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
              </div>
            </div>
            <p className="text-gray-600">{userData?.info?.profileLevel || 'Product Designer at Twitter'}</p>
            <div className="flex items-center text-gray-500 mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{userData?.info?.city || 'Manchester'}, {userData?.info?.workCountry || 'UK'}</span>
            </div>
          </div>
          
       
        </div>
        
        {/* About section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">About me</h2>
            <button 
              className="text-blue-600"
              onClick={handleEditOverview}
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
          
          {loadingOverview ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : userOverview?.overviewDetail ? (
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{userOverview.overviewDetail}</p>
            </div>
          ) : (
            <div className="text-gray-600 mt-2">
              I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.

              For 10 years, I've specialized in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.
            </div>
          )}
        </div>
      </div>
      
      {/* Edit Bio Modal */}
      {isEditingOverview && (
        <div className="fixed inset-0 bg-[#00000061] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Bio</h3>
              <button 
                onClick={() => setIsEditingOverview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Me
              </label>
              <textarea
                value={editedOverview}
                onChange={(e) => setEditedOverview(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about yourself, your experience, skills, and interests..."
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">Write a brief description about yourself that highlights your professional background and personality.</p>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditingOverview(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled={loadingOverview}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOverview}
                className="px-4 py-2 primary-button rounded-md"
                disabled={loadingOverview}
              >
                {loadingOverview ? "Saving..." : "Save Bio"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader; 
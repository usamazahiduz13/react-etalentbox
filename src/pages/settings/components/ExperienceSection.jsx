import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import fetchApi from '../../../utils/axios';
import { toast } from 'sonner';

const ExperienceSection = ({ onEdit, onAdd }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    if (!userInfo?.userId) {
      toast.error("User information not found. Please log in again.");
      return;
    }

    try {
      const response = await fetchApi.get(`/Experience?userId=${userInfo.userId}`);
      
      // Handle the new response format
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
      setExperiences(response.data.data);
        
      } else {
        toast.error(response.data?.message || "Failed to load experiences");
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast.error(error.response?.data?.message || "Failed to load experiences");
    } finally {
    }
  };

  // Fetch experiences when component mounts
  useEffect(() => {
    fetchExperiences();
  }, [userInfo]);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
        <button 
          className="w-6 h-6 text-gray-500 hover:text-gray-700"
          onClick={() => onAdd()}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      {experiences && experiences.length > 0 ? (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="relative border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                    {exp.companyLogo ? (
                      <img src={exp.companyLogo} alt={exp.companyName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-blue-600 text-xl font-bold">
                        {exp.companyName?.charAt(0) || 'C'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{exp.jobTitle || 'Product Designer'}</h3>
                      <p className="text-gray-700">{exp.companyName || 'Twitter'}</p>
                      <p className="text-gray-500 text-sm">
                        {exp.employmentType || 'Full-Time'} · 
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'} · 
                        {exp.city && exp.country ? `${exp.city}, ${exp.country}` : 'Manchester, UK'}
                      </p>
                    </div>
                    <button 
                      className="text-blue-600 p-1"
                      onClick={() => onEdit(exp, index)}
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
                  <p className="text-gray-600 mt-2">{exp.description || 'Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.'}</p>
                </div>
              </div>
            </div>
          ))}
          {experiences.length > 3 && (
            <div className="text-center mt-2">
              <button className="text-blue-600 font-medium hover:underline">
                Show {experiences.length - 3} more experiences
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>No experience information available</p>
          <button 
            className="mt-2 text-blue-600 font-medium hover:underline"
            onClick={() => onAdd()}
          >
            + Add experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection; 
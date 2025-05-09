import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import fetchApi from '../../../utils/axios';
import { toast } from 'sonner';
const EducationSection = ({  onEdit, onAdd }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [education, setEducation] = useState([]);

  // Get education
  const getEducation = async () => {
    try {
      if (!userInfo?.userId) {
        console.error('User ID not found');
        return;
      }

      const response = await fetchApi.get(`Education/${userInfo.userId}`);

      if (response.data && response.data.success) {
        setEducation(response.data.data);
      }
    } catch (error) {
      console.error('Education fetch error:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch education data');
    }
  };

  useEffect(() => {
    getEducation();
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        <button 
          className="w-6 h-6 text-gray-500 hover:text-gray-700"
          onClick={() => onAdd()}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      {education && education.length > 0 ? (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="relative border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center overflow-hidden">
                    {edu.schoolLogo ? (
                      <img src={edu.schoolLogo} alt={edu.schoolName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-red-600 text-xl font-bold">
                        {edu.schoolName?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{edu.school || 'Harvard University'}</h3>
                      <p className="text-gray-700">{edu.degree || 'Postgraduate degree'}, {edu.fieldOfStudy || 'Applied Psychology'}</p>
                      <p className="text-gray-500 text-sm">
                        {edu.startDate && new Date(edu.startDate).getFullYear()} - 
                        {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                      </p>
                    </div>
                    <button 
                      className="text-blue-600 p-1"
                      onClick={() => onEdit(edu, index)}
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
                  <p className="text-gray-600 mt-2">{edu.description || 'As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analyzing, researching and changing behavior.'}</p>
                </div>
              </div>
            </div>
          ))}
          {education.length > 2 && (
            <div className="text-center mt-2">
              <button className="text-blue-600 font-medium hover:underline">
                Show {education.length - 2} more educations
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>No education information available</p>
          <button 
            className="mt-2 text-blue-600 font-medium hover:underline"
            onClick={() => onAdd()}
          >
            + Add education
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationSection; 
import React, { useState } from 'react';
import fetchApi from '../../../../utils/axios';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { addTechnicalSkill, addSoftSkill } from '../../../../Redux/user-slice';

const SkillModal = ({ isOpen, onClose, skillType, userId, onSuccess }) => {
  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const api=import.meta.env.VITE_API_URL

  const handleChange = (e) => {
    setSkill(e.target.value);
    if (error) setError('');
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const getExperienceValue = (level) => {
    switch (level) {
      case 'beginner': return 1;
      case 'experienced': return 2;
      case 'professional': return 3;
      default: return 1;
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Ensure we prevent the default form submission
    
    if (!skill.trim()) {
      setError('Skill name is required');
      return;
    }

    try {
      setLoading(true);
      const endpoint = skillType === 'soft' ? 'SoftSkill' : 'TechnicalSkill';
      
      // Create skill payload
      const payload = skillType === 'soft' ? [{
        id: 0,
        name: skill.trim(),
        experience: getExperienceValue(experience),
        userId: userInfo?.userId,
        likeCount: 0,
        rating: 0,
        softSkillLike: []
      }] : [{
        id: 0,
        name: skill.trim(),
        experience: getExperienceValue(experience),
        userId: userInfo?.userId,
        likeCount: 0,
        rating: 0,
        technicalSkillLike: []
      }];

      // Send API request to add skill
      const response = await fetchApi.post(`/${endpoint}`, payload);
      
      // Only update Redux if the API call was successful
      if (response.data && response.data.success) {
        // Get the newly created skill from the response
        const createdSkills = response.data.data || [];
        
        // Add each created skill to Redux
        if (createdSkills.length > 0) {
          createdSkills.forEach(newSkill => {
            if (skillType === 'soft') {
              dispatch(addSoftSkill(newSkill));
            } else {
              dispatch(addTechnicalSkill(newSkill));
            }
          });
          
          toast.success(`${skillType === 'soft' ? 'Soft' : 'Technical'} skill added successfully`);
          
          // Reset form and close modal
          setSkill('');
          setExperience('beginner');
          onClose();
          
      
      } else {
        toast.error('Failed to add skill: ' + (response.data?.message || 'Unknown error'));
      }
    }} catch (error) {
      console.error('Skill add error:', error);
      toast.error(error.response?.data?.message || 'Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000061] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Add {skillType === 'soft' ? 'Soft' : 'Technical'} Skill
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {skillType === 'soft' ? 'Soft' : 'Technical'} Skill Name *
              </label>
              <input
                type="text"
                value={skill}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder={skillType === 'soft' 
                  ? "Communication, Leadership, Teamwork, etc."
                  : "JavaScript, Python, React, etc."}
                disabled={loading}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Experience Level
              </label>
              <select
                value={experience}
                onChange={handleExperienceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={loading}
              >
                <option value="beginner">Beginner</option>
                <option value="experienced">Experienced</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 primary-button"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Skill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillModal; 
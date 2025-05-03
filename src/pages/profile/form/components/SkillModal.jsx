import React, { useState } from 'react';
import fetchApi from '../../../../utils/axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const SkillModal = ({ isOpen, onClose, skillType, userId, onSuccess }) => {
  const [skill, setSkill] = useState('');
  const [error, setError] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const api=import.meta.env.VITE_API_URL

  const handleChange = (e) => {
    setSkill(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!skill.trim()) {
      setError('Skill name is required');
      return;
    }

    try {
      const endpoint = skillType === 'soft' ? 'SoftSkill' : 'TechnicalSkill';
      const payload = skillType === 'soft' 
        ? { name: skill.trim() }
        : [{
            id: 0,
            name: skill.trim(),
            experience: 0,
            userId: userInfo?.userId,
          }];

      await fetchApi.post(`${api}/${endpoint}`, payload, {
        headers: {
          'Content-Type': 'application/json-patch+json'
        }
      });

      toast.success(`${skillType === 'soft' ? 'Soft' : 'Technical'} skill added successfully`);
      setSkill('');
      onClose();
      onSuccess();
    } catch (error) {
      console.error('Skill add error:', error);
      toast.error(error.response?.data?.message || 'Failed to add skill');
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
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 primary-button"
              >
                Add Skill
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillModal; 
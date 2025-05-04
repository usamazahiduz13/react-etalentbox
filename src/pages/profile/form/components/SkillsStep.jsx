import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus, FaTimes } from 'react-icons/fa';
import SkillModal from './SkillModal';
import fetchApi from '../../../../utils/axios';
import { toast } from 'sonner';
import { setTechnicalSkills, removeTechnicalSkill, setSoftSkills, removeSoftSkill } from '../../../../Redux/user-slice';

const SkillsStep = () => {
  const { isLogin, userInfo } = useSelector(state => state.auth);
  const { technicalSkills: reduxTechnicalSkills, softSkills: reduxSoftSkills } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillType, setSkillType] = useState('soft'); // 'soft' or 'technical'
  const [softSkills, setSoftSkills] = useState([]);
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_API_URL;

  // Get the experience level label based on value
  const getExperienceLabel = (value) => {
    switch (value) {
      case 1: return 'Beginner';
      case 2: return 'Experienced';
      case 3: return 'Professional';
      default: return '';
    }
  };

  useEffect(() => {
    if (userInfo?.userId) {
      fetchSkills();
    }
  }, [userInfo?.userId]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const [softSkillsRes, technicalSkillsRes] = await Promise.all([
        fetchApi.get(`/SoftSkill/${userInfo.userId}`),
        fetchApi.get(`/TechnicalSkill?userId=${userInfo.userId}`)
      ]);
      
      const softData = softSkillsRes?.data?.data || [];
      const technicalData = technicalSkillsRes.data?.data || [];
      
      setSoftSkills(softData);
      setTechnicalSkills(technicalData);
      
      // Update Redux store
      dispatch(setSoftSkills(softData));
      dispatch(setTechnicalSkills(technicalData));
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = (type) => {
    setSkillType(type);
    setIsModalOpen(true);
  };

  /**
   * Remove a skill from the API and Redux store
   * @param {Object} skill - The skill object to remove
   * @param {string} type - The type of skill ('soft' or 'technical')
   */
  const handleRemoveSkill = async (skill, type) => {
    try {
      const endpoint = type === 'soft' ? 'SoftSkill' : 'TechnicalSkill';
      
      // Create payload for API delete request
      const payload = {
        id: skill.id,
        name: skill.name || "",
        experience: skill.experience || 0,
        userId: userInfo.userId,
        likeCount: skill.likeCount || 0,
        rating: skill.rating || 0,
        technicalSkillLike: skill.technicalSkillLike || []
      };
      
      // Make DELETE request to API with payload
      const response = await fetchApi.delete(`/${endpoint}`, { 
        data: payload,
        headers: { 'Content-Type': 'application/json-patch+json' }
      });
      
      // If the delete was successful, update Redux store
      if (response.status === 200 || response.status === 204) {
        if (type === 'soft') {
          dispatch(removeSoftSkill(skill.id));
          setSoftSkills(softSkills.filter(s => s.id !== skill.id));
        } else {
          dispatch(removeTechnicalSkill(skill.id));
          setTechnicalSkills(technicalSkills.filter(s => s.id !== skill.id));
        }
        
        toast.success('Skill removed successfully');
      } else {
        toast.error('Failed to remove skill');
      }
    } catch (error) {
      console.error('Error removing skill:', error);
      toast.error(error.response?.data?.message || 'Failed to remove skill');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
        <div className="flex gap-2">
          <div
            onClick={() => handleAddClick('soft')}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer outline-none font-medium"
          >
            <FaPlus size={14} />
            <span>Add Soft Skill</span>
          </div>
          <div
            onClick={() => handleAddClick('technical')}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer outline-none font-medium"
          >
            <FaPlus size={14} />
            <span>Add Technical Skill</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6">Loading skills...</div>
      ) : (
        <>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Soft Skills</h3>
            {softSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <div 
                    key={skill.id} 
                    className="bg-gray-200 px-3 py-1.5 rounded-full flex items-center gap-2"
                  >
                    <span className="text-primary font-medium">{skill.name}</span>
                    {skill.experience > 0 && (
                      <span className="text-xs text-primary-dark bg-primary bg-opacity-20 px-1.5 py-0.5 rounded">
                        {getExperienceLabel(skill.experience)}
                      </span>
                    )}
                    <span
                      onClick={() => handleRemoveSkill(skill, 'soft')}
                      className="text-primary hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <FaTimes size={12} />
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No soft skills added yet.</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Technical Skills</h3>
            {technicalSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill) => (
                  <div 
                    key={skill.id} 
                    className="bg-gray-200 px-3 py-1.5 rounded-full flex items-center gap-2"
                  >
                    <span className="text-primary font-medium">{skill.name}</span>
                    {skill.experience > 0 && (
                      <span className="text-xs text-primary-dark bg-primary bg-opacity-20 px-1.5 py-0.5 rounded">
                        {getExperienceLabel(skill.experience)}
                      </span>
                    )}
                    <span
                      onClick={() => handleRemoveSkill(skill, 'technical')}
                      className="text-primary hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <FaTimes size={12} />
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No technical skills added yet.</p>
              </div>
            )}
          </div>
        </>
      )}

      <SkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        skillType={skillType}
        userId={userInfo?.userId}
        onSuccess={fetchSkills}
      />
    </div>
  );
};

export default SkillsStep; 
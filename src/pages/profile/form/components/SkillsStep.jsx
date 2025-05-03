import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus, FaTimes } from 'react-icons/fa';
import SkillModal from './SkillModal';
import fetchApi from '../../../../utils/axios';
import { toast } from 'sonner';

const SkillsStep = () => {
  const { isLogin, userInfo } = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillType, setSkillType] = useState('soft'); // 'soft' or 'technical'
  const [softSkills, setSoftSkills] = useState([]);
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const api=import.meta.env.VITE_API_URL

  useEffect(() => {
    if (userInfo?.userId) {
      fetchSkills();
    }
  }, [userInfo?.userId]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const [softSkillsRes, technicalSkillsRes] = await Promise.all([
        fetchApi.get(`SoftSkill/${userInfo.userId}`),
        fetchApi.get(`TechnicalSkill?userId=${userInfo.userId}`)
      ]);
      
      setSoftSkills(softSkillsRes.data || []);
      setTechnicalSkills(technicalSkillsRes.data || []);
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

  const handleRemoveSkill = async (id, type) => {
    try {
      const endpoint = type === 'soft' ? 'SoftSkill' : 'TechnicalSkill';
      await fetchApi.delete(`${endpoint}/${id}`);
      toast.success('Skill removed successfully');
      fetchSkills(); // Refresh the skills list
    } catch (error) {
      console.error('Error removing skill:', error);
      toast.error('Failed to remove skill');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleAddClick('soft')}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer outline-none font-medium"
          >
            <FaPlus size={14} />
            <span>Add Soft Skill</span>
          </button>
          <button
            onClick={() => handleAddClick('technical')}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer outline-none font-medium"
          >
            <FaPlus size={14} />
            <span>Add Technical Skill</span>
          </button>
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
                    className="bg-primary bg-opacity-10 px-3 py-1.5 rounded-full flex items-center gap-2"
                  >
                    <span className="text-primary font-medium">{skill.name}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill.id, 'soft')}
                      className="text-primary hover:text-red-500 transition-colors"
                    >
                      <FaTimes size={12} />
                    </button>
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
                    className="bg-primary bg-opacity-10 px-3 py-1.5 rounded-full flex items-center gap-2"
                  >
                    <span className="text-primary font-medium">{skill.name}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill.id, 'technical')}
                      className="text-primary hover:text-red-500 transition-colors"
                    >
                      <FaTimes size={12} />
                    </button>
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
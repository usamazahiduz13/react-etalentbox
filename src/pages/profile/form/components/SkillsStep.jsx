import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSpeciality } from '../../../../Redux/user-slice';
import { FaPlus, FaTimes } from 'react-icons/fa';
import SkillModal from './SkillModal';

const SkillsStep = () => {
  const dispatch = useDispatch();
  const { specialities } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveSkill = (id) => {
    dispatch(removeSpeciality(id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer outline-none font-medium"
        >
          <FaPlus size={14} />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Your Skills</h3>
        
        {specialities && specialities.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {specialities.map((skill, index) => (
              <div 
                key={index} 
                className="bg-primary bg-opacity-10 px-3 py-1.5 rounded-full flex items-center gap-2"
              >
                <span className="text-primary font-medium">{skill.name}</span>
                <button
                  onClick={() => handleRemoveSkill(skill.id || index)}
                  className="text-primary hover:text-red-500 transition-colors"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No skills added yet. Click "Add Skill" to begin.</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Skill Tips</h3>
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2">
            <li>Add skills that showcase your strengths and experiences</li>
            <li>Include both technical skills and soft skills</li>
            <li>Be specific about technologies and tools you're proficient in</li>
            <li>Prioritize skills that are relevant to your target roles</li>
          </ul>
        </div>
      </div>

      <SkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SkillsStep; 
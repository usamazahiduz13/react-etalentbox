import { useState } from 'react';

const SkillsSection = ({ skills = [], onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        <button 
          className="w-6 h-6 text-gray-500 hover:text-gray-700"
          onClick={() => onAdd()}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
              {skill.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>No skills information available</p>
          <button 
            className="mt-2 text-blue-600 font-medium hover:underline"
            onClick={() => onAdd()}
          >
            + Add skills
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsSection; 
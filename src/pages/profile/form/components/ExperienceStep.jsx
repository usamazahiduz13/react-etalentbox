import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeExperience } from '../../../../Redux/user-slice';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import ExperienceModal from './ExperienceModal';

const ExperienceStep = () => {
  const dispatch = useDispatch();
  const { experiences } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddClick = () => {
    setCurrentExperience(null);
    setEditIndex(-1);
    setIsModalOpen(true);
  };

  const handleEditClick = (exp, index) => {
    setCurrentExperience(exp);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleRemoveClick = (index) => {
    if (window.confirm('Are you sure you want to remove this experience entry?')) {
      dispatch(removeExperience(index));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Work Experience</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 cursor-pointer transition-colors"
        >
          <FaPlus size={14} />
          <span>Add Experience</span>
        </button>
      </div>

      {experiences && experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{exp.title}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                  </p>
                  {exp.employmentType && (
                    <p className="text-gray-600 mt-1">Employment Type: {exp.employmentType}</p>
                  )}
                  {(exp.city || exp.country) && (
                    <p className="text-gray-600">
                      Location: {[exp.city, exp.country].filter(Boolean).join(', ')}
                    </p>
                  )}
                  {exp.industry && (
                    <p className="text-gray-600">Industry: {exp.industry}</p>
                  )}
                  {exp.description && (
                    <div className="mt-2">
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(exp, index)}
                    className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleRemoveClick(index)}
                    className="p-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No experience entries yet. Click "Add Experience" to begin.</p>
        </div>
      )}

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={currentExperience}
        editIndex={editIndex}
      />
    </div>
  );
};

export default ExperienceStep; 
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeEducation } from '../../../../Redux/user-slice';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import EducationModal from './EducationModal';

const EducationStep = () => {
  const dispatch = useDispatch();
  const { education } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddClick = () => {
    setCurrentEducation(null);
    setEditIndex(-1);
    setIsModalOpen(true);
  };

  const handleEditClick = (edu, index) => {
    setCurrentEducation(edu);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleRemoveClick = (index) => {
    if (window.confirm('Are you sure you want to remove this education entry?')) {
      dispatch(removeEducation(index));
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
        <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 cursor-pointer transition-colors font-medium"
        >
          <FaPlus size={14} />
          <span>Add Education</span>
        </button>
      </div>

      {education && education.length > 0 ? (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
                  </p>
                  {edu.fieldOfStudy && (
                    <p className="text-gray-600 mt-1">Field of Study: {edu.fieldOfStudy}</p>
                  )}
                  {edu.grade && (
                    <p className="text-gray-600">Grade: {edu.grade}</p>
                  )}
                  {edu.description && (
                    <p className="text-gray-600 mt-2">{edu.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(edu, index)}
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
          <p className="text-gray-500">No education entries yet. Click "Add Education" to begin.</p>
        </div>
      )}

      <EducationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={currentEducation}
        editIndex={editIndex}
      />
    </div>
  );
};

export default EducationStep; 
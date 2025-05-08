import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import fetchApi from '../../../utils/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AboutModal = ({ isOpen, onClose, initialData, onSuccess,bio, setBio }) => {
  const { userInfo } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet'
  ];

  const handleSubmit = async () => {
    if (!bio.trim()) {
      toast.error('Please enter your bio');
      return;
    }

    setIsLoading(true);
    try {
      // Construct the update payload
      const updateData = {
        userId: userInfo.userId,
        overviewDetail: bio
      };

      // Make API call to update bio
      const response = await fetchApi.put('/Overview', updateData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.success) {
        toast.success('Bio updated successfully');
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(response.data?.message || 'Failed to update bio');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while updating bio');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Edit About Me</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Tell us about yourself
            </label>
            <div className="quill-editor-container">
              <ReactQuill
                theme="snow"
                value={bio?.overviewDetail}
                onChange={(value) => setBio({ ...bio, overviewDetail: value })}
                modules={modules}
                formats={formats}
                className="h-48 mb-4"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Write a short bio describing your experience, skills, and what you're passionate about.
            </p>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md primary-button"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal; 
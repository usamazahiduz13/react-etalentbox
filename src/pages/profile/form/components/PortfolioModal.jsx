import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import fetchApi from '../../../../utils/axios';

const PortfolioModal = ({ isOpen, onClose, initialData = null, editIndex = -1, onSuccess }) => {
  const { userInfo } = useSelector(state => state.auth);
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      projectUrl: '',
      description: '',
      userId: userInfo?.userId
    }
  );
  
  // Update formData when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      // Format dates for input fields
      const startDate = initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '';
      const endDate = initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '';
      
      setFormData({
        ...initialData,
        startDate,
        endDate
      });
    }
  }, [initialData]);
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Project name is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.currentlyWorking && !formData.endDate) {
      newErrors.endDate = 'End date is required if not currently working on this project';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!validate()) return;
    
    const portfolioData = {
      ...formData,
      id: formData.id || 0,
      userId: userInfo?.userId,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null
    };
    
    setIsLoading(true);
    try {
      if (editIndex >= 0) {
        // Update existing portfolio
        const res =await fetchApi.put(`/Portfolio`, portfolioData);
        if(res.data && res.data.success){
          toast.success('Portfolio project updated successfully');
        }
      } else {
        // Add new portfolio
        const res = await fetchApi.post('/Portfolio', portfolioData);
        if(res.data && res.data.success){
          toast.success('Portfolio project added successfully');
        }
      }
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save portfolio project');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000061] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[640px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {editIndex >= 0 ? 'Edit Portfolio Project' : 'Add Portfolio Project'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Project Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Project Name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">End Date {!formData.currentlyWorking && '*'}</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={formData.currentlyWorking}
                  className={`w-full px-3 py-2 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${formData.currentlyWorking ? 'bg-gray-100' : ''}`}
                />
                {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">I am currently working on this project</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Project URL</label>
              <input
                type="url"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe your project, its goals, and your role"
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
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
                className="px-4 py-2 primary-button"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : editIndex >= 0 ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal; 
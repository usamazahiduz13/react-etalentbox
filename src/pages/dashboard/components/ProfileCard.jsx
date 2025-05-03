import React from 'react';
import avatar from '../../../assets/imgs/avatar-1.jpg'
import ExperienceCard from './ExperienceCard';
import { FaEdit } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full gap-4">
      <div className='flex flex-col items-center'>
        <div className='flex justify-end items-center mb-2 w-full'>
          <button className='hover:bg-gray-100 rounded-full p-2'>
            <FaEdit className='w-5 h-5' />
          </button>
        </div>
      <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full mb-3 object-cover" />
      <h2 className="text-xl font-semibold">Reggie Coaster</h2>
      <p className="text-base text-gray-500">Senior Software Engineer</p>
      <p className="text-sm text-gray-400 mb-2">Islamabad, Pakistan</p>
      <div className="flex items-center mb-3">
        {[1,2,3,4,5].map(i => (
          <svg key={i} className={`w-5 h-5 ${i <= 3 ? 'text-green-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
        ))}
      </div>
      <div className="flex w-full justify-between mb-4">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400">Work Experience</span>
          <span className="font-semibold text-base">10+ years</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400">Profile Level</span>
          <span className="font-semibold text-base">Professional</span>
        </div>
      </div>
      <div className="w-full">
        <div className='flex items-center justify-between w-full'>
        <span className="text-xl text-gray-600 font-medium">Top Skills</span>
        <button className='hover:bg-gray-100 rounded-full p-2'>
          <FaPlus className='w-5 h-5' />
        </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Enterprise Java', 'API Development', 'Python', 'Cloud Computing'].map(skill => (
            <span key={skill} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">{skill}</span>
          ))}
        </div>
      </div>
      </div>
      <ExperienceCard/>
    </div>
  );
};

export default ProfileCard; 
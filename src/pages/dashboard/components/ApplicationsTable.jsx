import React from 'react';
import { FaFilter } from 'react-icons/fa';

const applications = [
  {
    position: 'Software Architect',
    company: 'Innovatech Solutions',
    employment: 'Full-Time',
    workModel: 'Remote',
    date: 'May 15, 2024',
    status: 'Interviewing',
  },
  {
    position: 'Senior Backend Developer',
    company: 'NexGen Technologies',
    employment: 'Full-Time',
    workModel: 'Hybrid',
    date: 'May 10, 2024',
    status: 'Awaiting Response',
  },
  {
    position: 'DevOps Engineer',
    company: 'CloudWave Inc.',
    employment: 'Contract',
    workModel: 'Remote',
    date: 'May 5, 2024',
    status: 'Applied',
  },
  {
    position: 'Lead Software Developer',
    company: 'BrightFuture Tech',
    employment: 'Full-Time',
    workModel: 'On-Site',
    date: 'April 30, 2024',
    status: 'Rejected',
  },
  {
    position: 'API Specialist',
    company: 'TechSphere Ltd.',
    employment: 'Part-Time',
    workModel: 'Remote',
    date: 'April 25, 2024',
    status: 'Offered',
  },
];

const statusColors = {
  Interviewing: 'bg-green-100 text-green-700',
  'Awaiting Response': 'bg-blue-100 text-blue-700',
  Applied: 'bg-blue-100 text-blue-700',
  Rejected: 'bg-red-100 text-red-700',
  Offered: 'bg-green-100 text-green-700',
};

const ApplicationsTable = () => (
  <div className="bg-white rounded-xl shadow p-4 w-full mt-2">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold">Applications</h3>
      <div className='flex items-center gap-2'>
      <input type="text" placeholder="Search employee, department, etc" className="rounded-md bg-[#F3F3F3] px-2 py-2 text-base w-56" />
      <button className="bg-[#14589C] text-white text-xs px-2 py-2 rounded-md ml-2">
        <FaFilter className='text-white w-5 h-5' />
      </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-[14px]">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2  text-left font-medium">Position</th>
            <th className="py-2  text-center font-medium">Company</th>
            <th className="py-2  text-center font-medium">Employment Type</th>
            <th className="py-2  text-center font-medium">Work Model</th>
            <th className="py-2 text-center font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, idx) => (
            <tr key={idx} className="border-b last:border-0 ">
              <td className="py-2 font-medium text-center">{app.position}</td>
              <td className="py-2 text-center">{app.company}</td>
              <td className="py-2 flex justify-center items-center flex-col">
                <span className={`bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium`}>{app.employment}</span>
              </td>
              <td className="py-2 text-center">{app.workModel}</td>
              <td className="py-2 text-center">
                <span className={`px-2 py-1 rounded-full font-medium ${statusColors[app.status]}`}>{app.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ApplicationsTable; 
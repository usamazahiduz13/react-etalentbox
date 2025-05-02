import React from 'react';

const jobs = [
  {
    title: 'Cloud Solutions Architect',
    company: 'SkyNet Solutions',
    location: 'Seattle, WA',
    tags: ['Full-Time', 'Remote'],
    description: 'Design and implement cloud infrastructure solutions, optimize performance, and ensure security compliance.',
    salary: '$140,000 - $170,000',
  },
  {
    title: 'Senior API Developer',
    company: 'CodeStream Inc.',
    location: 'Austin, TX',
    tags: ['Full-Time', 'On-Site'],
    description: 'Develop and maintain robust APIs, integrate with third-party services, and ensure high performance and scalability.',
    salary: '$130,000 - $160,000',
  },
];

const JobSuggestions = () => (
  <div className="flex flex-col gap-3">
    {jobs.map((job, idx) => (
      <div key={job.title} className="bg-white rounded-xl shadow p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          {job.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">{tag}</span>
          ))}
        </div>
        <div className="font-semibold text-sm mb-0.5">{job.title}</div>
        <div className="text-xs text-gray-500 mb-1">{job.company} • {job.location}</div>
        <div className="text-xs text-gray-400 mb-2">{job.description}</div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-blue-600 font-bold text-sm">{job.salary}</span>
          <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded font-medium hover:bg-blue-600">Apply Now</button>
        </div>
      </div>
    ))}
  </div>
);

export default JobSuggestions; 
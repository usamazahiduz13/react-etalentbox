import React from 'react';

const recentSearches = [
  {
    day: 'Today',
    items: [
      { title: 'Software Architect', time: '10:15 AM' },
      { title: 'AWS Certified Solutions Architect.', time: '9:00 AM' },
    ],
  },
  {
    day: 'Yesterday',
    items: [
      { title: 'Senior Backend Developer', time: '4:30 AM' },
      { title: 'Innovatech Solutions.', time: '2:45 PM' },
      { title: 'Networking.', time: '1:00 PM' },
      { title: 'Senior Backend Developer', time: '4:30 AM' },
      { title: 'Innovatech Solutions.', time: '2:45 PM' },
    ],
  },
];

const RecentJobSearch = () => (
  <div className="bg-white rounded-xl shadow p-5 w-full mt-2">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-xl font-semibold">Recent Job Search</h3>
      <button className="text-gray-400 text-xl font-bold">...</button>
    </div>
    <div className="text-base">
      {recentSearches.map((group, idx) => (
        <div key={group.day} className="mb-3">
          <div className="font-semibold text-lg mb-2">{group.day}</div>
          <ul className="space-y-2">
            {group.items.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <div className='flex flex-col'>
                <span className="flex-1 text-base font-medium">{item.title}</span>
                <span className="text-gray-400 text-sm">{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default RecentJobSearch; 
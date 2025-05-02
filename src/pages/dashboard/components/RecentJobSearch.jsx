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
  <div className="bg-white rounded-xl shadow p-4 w-full mt-2">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-[16px] font-semibold">Recent Job Search</h3>
      <button className="text-gray-400 text-xl font-bold">...</button>
    </div>
    <div className="text-xs">
      {recentSearches.map((group, idx) => (
        <div key={group.day} className="mb-2">
          <div className="font-semibold tex-[16px] mb-2">{group.day}</div>
          <ul className="space-y-1">
            {group.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className=" w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <div className='flex flex-col'>
                <span className="flex-1  text-[14px] font-medium">{item.title}</span>
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
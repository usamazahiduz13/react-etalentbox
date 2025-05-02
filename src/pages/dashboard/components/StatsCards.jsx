import React from 'react';
import { FaRegFileAlt, FaCalendarAlt, FaTimesCircle, FaEye } from 'react-icons/fa';

const stats = [
  {
    label: 'Total Applications',
    value: 198,
    change: '+9.78%',
    up: true,
    sub: 'from last week',
    icon: <FaRegFileAlt className="text-blue-700 w-5 h-5" />,
    iconBg: 'bg-blue-100',
  },
  {
    label: 'Interview Schedule',
    value: 36,
    change: '+6.29%',
    up: true,
    sub: 'from last week',
    icon: <FaCalendarAlt className="text-blue-700 w-5 h-5" />,
    iconBg: 'bg-blue-100',
  },
  {
    label: 'Application Rejected',
    value: 56,
    change: '-1.78%',
    up: false,
    sub: 'from last week',
    icon: <FaTimesCircle className="text-red-600 w-5 h-5" />,
    iconBg: 'bg-red-100',
  },
  {
    label: 'Profile Visited',
    value: 96,
    change: '+5.32%',
    up: true,
    sub: 'from last week',
    icon: <FaEye className="text-blue-700 w-5 h-5" />,
    iconBg: 'bg-blue-100',
  },
];

const arrow = (up) => up ? (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
) : (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
);

const StatsCards = () => (
  <div className="bg-white rounded-xl shadow p-2">
    <div className="grid grid-cols-2 gap-x-2 gap-y-2">
      {stats.map((stat, idx) => (
        <div key={stat.label} className="flex flex-col justify-between p-2 relative min-h-[100px]">
          <div className="absolute top-2 right-2">
            <span className={`rounded-lg p-2 ${stat.iconBg} flex items-center justify-center`}>{stat.icon}</span>
          </div>
          <span className="text-xs text-gray-500 mb-1 font-medium">{stat.label}</span>
          <div className="flex items-end gap-2 mb-1 mt-2">
            <span className="text-2xl font-bold leading-none">{stat.value}</span>
            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${stat.up ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{arrow(stat.up)} {stat.change}</span>
          </div>
          <span className="text-[11px] text-gray-400 mt-0.5">{stat.sub}</span>
        </div>
      ))}
    </div>
  </div>
);

export default StatsCards; 
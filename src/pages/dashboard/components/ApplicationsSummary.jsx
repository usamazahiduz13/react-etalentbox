import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FaChevronDown } from 'react-icons/fa';
const data = [
  { name: 'On-Site', value: 98, color: '#A7F3D0' },
  { name: 'Remote', value: 64, color: '#60A5FA' },
  { name: 'Hybrid', value: 36, color: '#6366F1' },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

const ApplicationsSummary = () => (
  <div className="bg-white rounded-xl shadow p-4 w-full flex flex-col">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-[14px] font-semibold">Applications Summary</h3>
      <button className="bg-[#14589C] text-white text-[14px] whitespace-nowrap px-2 py-1 rounded font-medium flex flex-nowrap items-center gap-2 cursor-pointer">Work Model <FaChevronDown className='w-4 h-4' /></button>
    </div>
    <div className="flex items-center justify-center relative h-40">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={2}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold">{total}</span>
        <span className="text-xs text-gray-400">Applications</span>
      </div>
    </div>
    <div className="flex justify-center gap-6 mt-2 text-xs">
      {data.map((d, idx) => (
        <span key={d.name} className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: d.color }}></span>
          {d.name}
          <span className="font-semibold ml-1">{d.value}</span>
        </span>
      ))}
    </div>
  </div>
);

export default ApplicationsSummary; 
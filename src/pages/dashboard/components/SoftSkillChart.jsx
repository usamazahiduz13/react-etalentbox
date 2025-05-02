import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Communication', value: 50, color: '#A7F3D0' },
  { name: 'Motivation', value: 30, color: '#6366F1' },
  { name: 'Empathy', value: 20, color: '#60A5FA' },
];

const SoftSkillChart = () => (
  <div className="bg-white rounded-xl shadow p-4 w-full flex flex-col items-center">
    <h3 className="text-md font-semibold mb-2">Soft Skill</h3>
    <div className="h-40 w-full flex items-center justify-center">
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
            label={false}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="flex justify-center gap-4 mt-2 text-xs">
      {data.map((d, idx) => (
        <span key={d.name} className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: d.color }}></span>
          {d.name}
        </span>
      ))}
    </div>
  </div>
);

export default SoftSkillChart; 
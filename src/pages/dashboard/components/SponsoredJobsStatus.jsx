import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'SAP-ABAP', value: 7 },
  { name: 'UI/UX Design', value: 13 },
  { name: 'Data Analysis', value: 9 },
];

const SponsoredJobsStatus = () => (
  <div className="bg-white rounded-xl shadow p-4 w-full">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-md font-semibold">Sponsored Jobs Status</h3>
      <span className="text-xs text-gray-400">Submitted Application</span>
    </div>
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value" fill="#60A5FA" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default SponsoredJobsStatus; 
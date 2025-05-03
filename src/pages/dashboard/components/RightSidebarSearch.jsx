import React from 'react';

const RightSidebarSearch = () => (
  <div className="flex items-center gap-2 mb-2">
    <input
      type="text"
      placeholder="Suggested job, company, etc"
      className="border border-[#D8D8D8] rounded-[8px] px-3 py-2 w-full"
    />
    <button className="bg-[#14589C] text-white text-sm px-2 py-2 rounded font-medium hover:bg-blue-600">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10zm5 4h6" /></svg>
    </button>
  </div>
);

export default RightSidebarSearch; 
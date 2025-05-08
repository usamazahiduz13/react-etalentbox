import { useState } from 'react';

const PortfolioSection = ({ portfolios = [], onEdit, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Portfolios</h2>
        <button 
          className="w-6 h-6 text-gray-500 hover:text-gray-700"
          onClick={() => onAdd()}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      {portfolios && portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolios.map((portfolio, index) => (
            <div key={index} className="rounded-lg overflow-hidden border border-gray-200 group relative">
              <div className="h-36 bg-gray-100 relative">
                {portfolio.imageUrl ? (
                  <img 
                    src={portfolio.imageUrl} 
                    alt={portfolio.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center bg-${
                    ['blue', 'purple', 'teal', 'amber'][index % 4]
                  }-100`}>
                    <span className={`text-lg font-medium text-${
                      ['blue', 'purple', 'teal', 'amber'][index % 4]
                    }-600`}>
                      {portfolio.name?.split(' ').map(word => word[0]).join('') || 'P'}
                    </span>
                  </div>
                )}
                <button 
                  className="absolute top-2 right-2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onEdit(portfolio, index)}
                >
                  <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                      strokeWidth="1.5" 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 mb-1">{portfolio.name || 'Project Name'}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {portfolio.description?.slice(0, 60) + (portfolio.description?.length > 60 ? '...' : '') || 'Project description...'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>No portfolio projects available</p>
          <button 
            className="mt-2 text-blue-600 font-medium hover:underline"
            onClick={() => onAdd()}
          >
            + Add portfolio project
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection; 
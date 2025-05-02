import React from "react";

const steps = [
  {
    title: 'Sign Up',
    description: 'Create One Profile',
    icon: 'https://img.icons8.com/ios-filled/50/1D4ED8/add-user-group-man-man.png',
  },
  {
    title: 'Search',
    description: 'Browse niche job listings',
    icon: 'https://img.icons8.com/ios-filled/50/1D4ED8/search--v1.png',
  },
  {
    title: 'Apply',
    description: 'Apply your dream job',
    icon: 'https://img.icons8.com/ios-filled/50/1D4ED8/submit-resume.png',
    highlight: true,
  },
  {
    title: 'Interview',
    description: 'Keep update with status',
    icon: 'https://img.icons8.com/ios-filled/50/1D4ED8/meeting-room.png',
  },
  {
    title: 'Get Hired',
    description: 'Start your new job',
    icon: 'https://img.icons8.com/ios-filled/50/1D4ED8/hired.png',
  },
  {
    title: 'Review',
    description: 'Enhance your skills: Explore new courses',
    icon: 'https://img.icons8.com/ios-filled/50/1D4ED8/rating.png',
  },
];

export default function JobSteps() {
  return (
    <div className="py-12 px-4 md:px-8 lg:px-16 w-full bg-white">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-center text-blue-900 font-bold text-2xl md:text-3xl lg:text-4xl mb-10">
          The Fast Track to Your Next Job
        </h2>
        <div className="relative flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center text-center px-2 md:px-4 lg:px-6 ${
                step.highlight
                  ? 'bg-white shadow-xl rounded-xl z-10 py-7 px-6 border border-blue-100' // Highlighted step
                  : 'bg-transparent'
              }`}
              style={{ minWidth: 120, maxWidth: 180 }}
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-3 ${step.highlight ? 'bg-blue-100' : 'bg-blue-50'}`}>
                <img src={step.icon} alt={step.title} className="w-7 h-7" />
              </div>
              <p className="text-base font-semibold text-blue-900 mb-1">{step.title}</p>
              <p className="text-xs text-gray-500 max-w-[120px] md:max-w-[140px] lg:max-w-[160px]">{step.description}</p>
              {/* Curved arrow SVG */}
              {i < steps.length - 1 && (
                <svg
                  className="hidden md:block absolute right-[-60px] top-1/2 transform -translate-y-1/2 w-24 h-12"
                  viewBox="0 0 100 50"
                >
                  <path
                    d="M0,25 Q50,-25 100,25"
                    fill="none"
                    stroke="#1D4ED8"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead)"
                  />
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="6"
                      markerHeight="6"
                      refX="0"
                      refY="3"
                      orient="auto"
                    >
                      <path d="M0,0 L0,6 L6,3 Z" fill="#1D4ED8" />
                    </marker>
                  </defs>
                </svg>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button className="primary-button">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

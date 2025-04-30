import React from "react";

const steps = [
  {
    title: 'Sign Up',
    description: 'Create One Profile',
    icon: 'https://img.icons8.com/ios-filled/50/000000/add-user-group-man-man.png',
  },
  {
    title: 'Search',
    description: 'Browse niche job listings',
    icon: 'https://img.icons8.com/ios-filled/50/000000/search--v1.png',
  },
  {
    title: 'Apply',
    description: 'Apply your dream job',
    icon: 'https://img.icons8.com/ios-filled/50/000000/submit-resume.png',
    highlight: true,
  },
  {
    title: 'Interview',
    description: 'Keep update with status',
    icon: 'https://img.icons8.com/ios-filled/50/000000/meeting-room.png',
  },
  {
    title: 'Get Hired',
    description: 'Start your new job',
    icon: 'https://img.icons8.com/ios-filled/50/000000/hired.png',
  },
  {
    title: 'Review',
    description: 'Enhance your skills: Explore new courses',
    icon: 'https://img.icons8.com/ios-filled/50/000000/rating.png',
  },
];

export default function JobSteps() {
  return (
    <div className="py-12 lg:px-16 md:px-8 px-4 text-center w-full ">
        <div className="max-w-[1280px] mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
        The Fast Track to Your Next Job
      </h2>

      <div className="relative flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 mt-10">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative flex flex-col items-center text-center ${
              step.highlight
                ? 'bg-white shadow-lg rounded-xl px-4 py-6'
                : ''
            }`}
          >
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <img src={step.icon} alt={step.title} className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-blue-900">{step.title}</p>
            <p className="text-xs text-gray-500 max-w-[120px]">{step.description}</p>

            {/* Curved arrow SVG */}
            {i < steps.length - 1 && (
              <svg
                className="hidden md:block absolute left-[96px] top-[-31px] w-24 h-12"
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

      <div className="mt-12">
        <button className=" primary-button transition">
          Learn More
        </button>
      </div>
      </div>
    </div>
  );
}

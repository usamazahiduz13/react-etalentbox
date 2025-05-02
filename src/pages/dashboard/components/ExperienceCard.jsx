import React from 'react';

const experiences = [
  {
    title: 'Lead Software Engineer',
    company: 'Tech Innovators Inc.',
    date: 'Jan 2018 - Present',
    description: 'Led dev team to design scalable software, improve performance, and mentor junior engineers.'
  },
  {
    title: 'Senior Developer',
    company: 'CodeCrafters Ltd.',
    date: 'Mar 2013 - Dec 2017',
    description: 'Developed and maintained web apps, collaborated to define requirements, and optimized existing codebases.'
  },
  {
    title: 'Senior Developer',
    company: 'CodeCrafters Ltd.',
    date: 'Mar 2013 - Dec 2017',
    description: 'Developed and maintained web apps, collaborated to define requirements, and optimized existing codebases.'
  },
  {
    title: 'Senior Developer',
    company: 'CodeCrafters Ltd.',
    date: 'Mar 2013 - Dec 2017',
    description: 'Developed and maintained web apps, collaborated to define requirements, and optimized existing codebases.'
  },
];

const ExperienceCard = () => (
  <div className="mt-4 w-full">
    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" /></svg>
      Experience
    </h3>
    <ul className="space-y-3">
      {experiences.map((exp, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="mt-1 text-blue-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12h1v1H9v-1zm0-8h1v7H9V4zm1-2a8 8 0 100 16 8 8 0 000-16z" /></svg>
          </span>
          <div>
            <div className="font-medium text-base">{exp.title}</div>
            <div className="text-xs text-gray-500">{exp.company} <span className="text-gray-400">· {exp.date}</span></div>
            <div className="text-base text-gray-800">{exp.description}</div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ExperienceCard; 
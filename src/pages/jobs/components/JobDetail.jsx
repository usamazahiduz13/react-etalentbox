import React from 'react';
import { FiChevronLeft, FiMapPin, FiShare2, FiBookmark, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const JobDetail = ({ job, onClose, isMobile }) => {
  if (!job) return null;

  return (
    <div className={`bg-white ${isMobile ? 'min-h-screen' : 'h-full rounded-l-lg shadow-2xl border-l border-gray-200'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {isMobile ? (
          <Link to="/find-jobs" className="flex items-center text-gray-600">
            <FiChevronLeft className="w-5 h-5 mr-1" />
            <span>Back to jobs</span>
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <FiShare2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <FiBookmark className="w-5 h-5" />
          </button>
          {!isMobile && (
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Job Content */}
      <div className="p-6 overflow-y-auto">
        {/* Company Logo and info */}
        <div className="flex mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded flex items-center justify-center mr-4">
            <img 
              src={job.logo || "https://via.placeholder.com/64"} 
              alt={job.employerName} 
              className="w-12 h-12"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{job.title}</h1>
            <div className="flex items-center mt-1 text-gray-600">
              <span className="font-medium">{job.employerName}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <FiMapPin className="mr-1" />
                <span>{job.city}, {job.country}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">Posted {job.postedDate || '19 hours ago'}</span>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded">
            <span className="text-gray-500 block mb-1">Salary per year:</span>
            <span className="font-semibold text-lg">{job.currency}{job.minSalary} - {job.currency}{job.maxSalary}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="text-gray-500 block mb-1">Employment Type</span>
            <span className="font-semibold">Full Time</span>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="text-gray-500 block mb-1">Experience Level</span>
            <span className="font-semibold">2-3 years</span>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="text-gray-500 block mb-1">Location</span>
            <span className="font-semibold">{job.city}, {job.country}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="text-gray-500 block mb-1">Contact</span>
            <span className="font-semibold">exampleuserhr@slack.com</span>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            A Senior UX Designer is a pivotal member of product development teams, responsible for ensuring that digital products
            and applications provide users with intuitive, efficient, and enjoyable interactions. They use a combination of research,
            thinking, and user empathy to inform their decisions, with the ultimate goal of delivering a seamless and satisfying user
            experience.
          </p>
        </div>

        {/* Job Description */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Job Description</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Develop precise user flows and wireframes.</li>
            <li>Create prototypes and conduct usability tests to address user challenges.</li>
            <li>Adhere to design system guidelines.</li>
            <li>Investigate optimal methods for generating thorough documentation.</li>
            <li>Offer guidance and mentorship to junior team members for optimal design execution.</li>
            <li>Act as a consultant for fellow UX Designers within at least 3 different groups or teams.</li>
          </ul>
        </div>

        {/* What We Offer */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">What we offer</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Competitive compensation package</li>
            <li>Convenient office location in the Copenhagen Area</li>
            <li>Significant responsibilities and autonomy</li>
            <li>Participation in a well-funded startup poised for international growth</li>
            <li>Collaborative work environment with an experienced team for learning and development</li>
            <li>Joining a tight-knit, personable, and friendly team</li>
            <li>Prospects for increased responsibilities in tandem with the company's expansion</li>
          </ul>
        </div>

        {/* About Company */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">About Company</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Slack Technologies, Inc. is a prominent software company headquartered in San Francisco, California. Founded in 2009 by
            Stewart Butterfield, Eric Costello, Cal Henderson, and Serguei Mourachov, the company has revolutionized team
            communication and collaboration with its innovative platform, Slack.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Slack offers various subscription plans to cater to the needs of different businesses, from small startups to large
            enterprises. These plans include free, standard, plus, and enterprise versions, each with its own set of features and
            capabilities. Since its official launch in 2013, Slack has experienced remarkable growth and adoption across various
            industries.
          </p>
        </div>

        {/* Apply Button - Fixed at bottom on mobile */}
        <div className={`${isMobile ? 'fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200' : ''}`}>
          <button className="w-full py-3 primary-button text-white font-medium rounded-md transition">
            Apply Now
          </button>
        </div>
        
        {/* Add bottom padding on mobile to account for fixed button */}
        {isMobile && <div className="h-16"></div>}
      </div>
    </div>
  );
};

export default JobDetail; 
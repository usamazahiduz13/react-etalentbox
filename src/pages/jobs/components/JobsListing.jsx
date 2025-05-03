import { useState } from 'react';
import { 
  FiBookmark, 
  FiMapPin, 
  FiSearch,
  FiChevronDown
} from 'react-icons/fi';

// Sample job data
const jobData = {
  "success": true,
  "data": [
    {
      "jobId": 1,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 2,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 3,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 4,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 5,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 6,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 7,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 8,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 9,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 10,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    },
    {
      "jobId": 11,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "500",
      "maxSalary": "5600",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    }
  ],
  "total": 90
};

const JobListingsPage = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Toggle job bookmark
  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };
  
  // Calculate time difference
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const hoursAgo = Math.floor((now - postedDate) / (1000 * 60 * 60));
    
    return `${hoursAgo} hours ago`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-72 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filter by</h2>
                <button className="text-gray-500 text-sm">Reset</button>
              </div>
              
              {/* Experience Level Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Experience level</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" checked className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">Any work experience</span>
                    <span className="ml-auto text-xs text-gray-500">(181)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">Less than 1 year</span>
                    <span className="ml-auto text-xs text-gray-500">(21)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">1-2 years</span>
                    <span className="ml-auto text-xs text-gray-500">(21)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">2-3 years</span>
                    <span className="ml-auto text-xs text-gray-500">(125)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">3-5 years</span>
                    <span className="ml-auto text-xs text-gray-500">(125)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">More than 5 years</span>
                    <span className="ml-auto text-xs text-gray-500">(125)</span>
                  </label>
                </div>
              </div>
              
              {/* Job Title Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Job title</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
                <div className="relative mb-3">
                  <input 
                    type="text" 
                    placeholder="Search Title" 
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">iOS Developer</span>
                    <span className="ml-auto text-xs text-gray-500">(181)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">Android Developer</span>
                    <span className="ml-auto text-xs text-gray-500">(21)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">Laravel Developer</span>
                    <span className="ml-auto text-xs text-gray-500">(125)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">UX/UI Designer</span>
                    <span className="ml-auto text-xs text-gray-500">(1259)</span>
                  </label>
                </div>
              </div>
              
              {/* Country Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Country</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
                <div className="relative mb-3">
                  <input 
                    type="text" 
                    placeholder="Search country" 
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">USA</span>
                    <span className="ml-auto text-xs text-gray-500">(181)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">UK</span>
                    <span className="ml-auto text-xs text-gray-500">(21)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">China</span>
                    <span className="ml-auto text-xs text-gray-500">(125)</span>
                  </label>
                </div>
              </div>
              
              {/* More filters collapsed */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">State</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Gender</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Industry</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Skill</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Company</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Functional areas</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Salary range</h3>
                  <FiChevronDown className="text-gray-500" />
                </div>
                <div className="relative mb-3">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none">
                    <option>Select currency</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-2.5 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">Less than $100</span>
                    <span className="ml-auto text-xs text-gray-500">(181)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">$100 to $500</span>
                    <span className="ml-auto text-xs text-gray-500">(21)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">$500- $1K</span>
                    <span className="ml-auto text-xs text-gray-500">(21)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">$1K- $5K</span>
                    <span className="ml-auto text-xs text-gray-500">(21)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">$5K +</span>
                    <span className="ml-auto text-xs text-gray-500">(125)</span>
                  </label>
                </div>
              </div>
              
              <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
                Find Job
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h1 className="text-xl font-bold">All Jobs List</h1>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Sort by:</span>
                  <div className="relative">
                    <select className="pr-8 pl-3 py-1.5 border border-gray-300 rounded-md text-sm appearance-none">
                      <option>Newest</option>
                      <option>Oldest</option>
                      <option>Salary: High to Low</option>
                      <option>Salary: Low to High</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Job Listings */}
              <div className="divide-y divide-gray-100">
                {jobData.data.map(job => (
                  <div key={job.jobId} className="p-4 sm:p-6 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
                        <div className="flex items-center mt-1 text-gray-600">
                          <span className="font-medium">{job.employerName}</span>
                          <span className="mx-2">•</span>
                          <span>Any work experience</span>
                          <span className="mx-2">•</span>
                          <span className="font-medium">{job.currency} {job.minSalary}-{job.maxSalary}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.jobType.map((type, index) => (
                            <span key={index} className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-md">{type}</span>
                          ))}
                        </div>
                        
                        <div className="flex items-center mt-3 text-gray-600">
                          <FiMapPin className="mr-1" />
                          <span>{job.city}, {job.country}</span>
                          <span className="ml-auto text-sm">{getTimeAgo(job.createdDate)}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => toggleSaveJob(job.jobId)}
                        className={`h-8 w-8 flex items-center justify-center rounded-full ${savedJobs.includes(job.jobId) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600'}`}
                      >
                        <FiBookmark className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-between items-center p-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing Jobs 1-16 Total 90
                </div>
                <div className="flex gap-1">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
                  <span className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">2</span>
                  <span className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">3</span>
                  <span className="px-3 py-1 text-gray-600">...</span>
                  <span className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">10</span>
                  <span className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">Next</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;
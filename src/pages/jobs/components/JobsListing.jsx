import { useState, useEffect } from 'react';
import { 
  FiBookmark, 
  FiMapPin, 
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiFilter,
  FiX
} from 'react-icons/fi';
import JobDetail from './JobDetail';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
      "minSalary": "140,000",
      "maxSalary": "170,000",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"],
      "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
    },
    {
      "jobId": 2,
      "title": "Senior UI/UX Designer",
      "employerName": "Slack Company LLC",
      "city": "Los Angeles",
      "country": "CA",
      "minSalary": "140,000",
      "maxSalary": "170,000",
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
      "minSalary": "140,000",
      "maxSalary": "170,000",
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
      "minSalary": "140,000",
      "maxSalary": "170,000",
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
      "minSalary": "140,000",
      "maxSalary": "170,000",
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
      "minSalary": "140,000",
      "maxSalary": "170,000",
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
      "minSalary": "140,000",
      "maxSalary": "170,000",
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
      "minSalary": "140,000",
      "maxSalary": "170,000",
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
      "minSalary": "140,000",
      "maxSalary": "170,000",
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
      "minSalary": "140,000",
      "maxSalary": "170,000",
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
      "minSalary": "140,000",
      "maxSalary": "170,000",
      "currency": "$",
      "createdDate": "2023-10-17T17:44:09.905",
      "jobType": ["Contract", "Remote", "Full Time", "Entry Level"]
    }
  ],
  "total": 90
};

// Filter options data
const filterOptions = {
  state: [
    { name: "California", count: 145 },
    { name: "New York", count: 90 },
    { name: "Texas", count: 75 },
    { name: "Florida", count: 60 },
    { name: "Illinois", count: 42 }
  ],
  gender: [
    { name: "All", count: 181 },
    { name: "Male", count: 96 },
    { name: "Female", count: 85 }
  ],
  industry: [
    { name: "Technology", count: 120 },
    { name: "Healthcare", count: 85 },
    { name: "Finance", count: 70 },
    { name: "Education", count: 60 },
    { name: "Retail", count: 45 }
  ],
  skill: [
    { name: "JavaScript", count: 110 },
    { name: "React", count: 90 },
    { name: "UI/UX Design", count: 85 },
    { name: "Python", count: 70 },
    { name: "Product Management", count: 45 }
  ],
  company: [
    { name: "Google", count: 35 },
    { name: "Microsoft", count: 30 },
    { name: "Amazon", count: 28 },
    { name: "Apple", count: 25 },
    { name: "Facebook", count: 22 }
  ],
  functionalAreas: [
    { name: "Engineering", count: 130 },
    { name: "Design", count: 85 },
    { name: "Marketing", count: 75 },
    { name: "Sales", count: 60 },
    { name: "Customer Support", count: 45 }
  ],
  salaryRange: [
    { name: "Less than $50,000", count: 35 },
    { name: "$50,000 - $100,000", count: 85 },
    { name: "$100,000 - $150,000", count: 105 },
    { name: "$150,000 - $200,000", count: 65 },
    { name: "More than $200,000", count: 25 }
  ]
};

const JobListingsPage = () => {
  const [expandedFilters, setExpandedFilters] = useState({
    experienceLevel: true,
    jobTitle: true,
    country: true,
    state: false,
    gender: false,
    industry: false,
    skill: false,
    company: false,
    functionalAreas: false,
    salaryRange: true
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId } = useParams();

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle job selection from URL params
  useEffect(() => {
    if (jobId) {
      const job = jobData.data.find(job => job.jobId === parseInt(jobId));
      if (job) {
        setSelectedJob(job);
      }
    } else {
      setSelectedJob(null);
    }
  }, [jobId]);
  
  // Toggle filter expansion
  const toggleFilter = (filterName) => {
    setExpandedFilters({
      ...expandedFilters,
      [filterName]: !expandedFilters[filterName]
    });
  };
  
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
  
  // Handle job selection
  const handleJobSelect = (job) => {
    setSelectedJob(job);
    if (isMobile) {
      navigate(`/find-jobs/${job.jobId}`);
    } else {
      // For desktop, we'll use the popup and update the URL without navigation
      window.history.pushState({}, '', `/find-jobs/${job.jobId}`);
    }
  };
  
  // Handle job detail close
  const handleCloseJobDetail = () => {
    setSelectedJob(null);
    navigate('/find-jobs');
  };
  
  // Close mobile filters when clicking outside
  const handleOutsideClick = (e) => {
    if (showMobileFilters && !e.target.closest('.mobile-filter-panel')) {
      setShowMobileFilters(false);
    }
  };

  // Apply event listener for outside clicks
  useEffect(() => {
    if (showMobileFilters) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showMobileFilters]);

  // Filter component for reuse across filter sections
  const FilterSection = ({ title, options, filterKey, expanded }) => (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center mb-3 cursor-pointer"
        onClick={() => toggleFilter(filterKey)}
      >
        <h3 className="font-medium">{title}</h3>
        {expanded ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
      </div>
      
      {expanded && (
        <>
          {(filterKey === 'jobTitle' || filterKey === 'country') && (
            <div className="relative mb-3">
              <input 
                type="text" 
                placeholder={`Search ${title.toLowerCase()}`} 
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          )}
          
          {filterKey === 'salaryRange' && (
            <div className="relative mb-3">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none">
                <option>Select currency</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
              <FiChevronDown className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          )}
          
          <div className="space-y-2">
            {options.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm">{option.name}</span>
                <span className="ml-auto text-xs text-gray-500">({option.count})</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12 relative">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowMobileFilters(true);
            }}
            className="flex items-center gap-2 bg-white rounded-lg shadow p-3 text-gray-700"
          >
            <FiFilter />
            <span>Filter Jobs</span>
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Panel */}
          <div 
            className={`lg:hidden fixed inset-0 bg-[#00000061] z-40 transition-opacity duration-300 ${
              showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div 
              className={`mobile-filter-panel absolute top-0 bottom-0 left-0 w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto transition-transform duration-300 transform ${
                showMobileFilters ? 'translate-x-0' : '-translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold">Filter by</h2>
                <button 
                  className="text-gray-500 p-2" 
                  onClick={() => setShowMobileFilters(false)}
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4">
                <FilterSection 
                  title="Experience level" 
                  options={[
                    { name: "Any work experience", count: 181 },
                    { name: "Less than 1 year", count: 21 },
                    { name: "1-2 years", count: 21 },
                    { name: "2-3 years", count: 125 },
                    { name: "3-5 years", count: 125 },
                    { name: "More than 5 years", count: 125 }
                  ]}
                  filterKey="experienceLevel"
                  expanded={expandedFilters.experienceLevel}
                />
                
                <FilterSection 
                  title="Job title" 
                  options={[
                    { name: "iOS Developer", count: 181 },
                    { name: "Android Developer", count: 21 },
                    { name: "Laravel Developer", count: 125 },
                    { name: "UX/UI Designer", count: 1259 }
                  ]}
                  filterKey="jobTitle"
                  expanded={expandedFilters.jobTitle}
                />
                
                <FilterSection 
                  title="Country" 
                  options={[
                    { name: "USA", count: 181 },
                    { name: "UK", count: 21 },
                    { name: "China", count: 125 }
                  ]}
                  filterKey="country"
                  expanded={expandedFilters.country}
                />
                
                <FilterSection 
                  title="State" 
                  options={filterOptions.state}
                  filterKey="state"
                  expanded={expandedFilters.state}
                />
                
                <FilterSection 
                  title="Gender" 
                  options={filterOptions.gender}
                  filterKey="gender"
                  expanded={expandedFilters.gender}
                />
                
                <FilterSection 
                  title="Industry" 
                  options={filterOptions.industry}
                  filterKey="industry"
                  expanded={expandedFilters.industry}
                />
                
                <FilterSection 
                  title="Skill" 
                  options={filterOptions.skill}
                  filterKey="skill"
                  expanded={expandedFilters.skill}
                />
                
                <FilterSection 
                  title="Company" 
                  options={filterOptions.company}
                  filterKey="company"
                  expanded={expandedFilters.company}
                />
                
                <FilterSection 
                  title="Functional areas" 
                  options={filterOptions.functionalAreas}
                  filterKey="functionalAreas"
                  expanded={expandedFilters.functionalAreas}
                />
                
                <FilterSection 
                  title="Salary range" 
                  options={filterOptions.salaryRange}
                  filterKey="salaryRange"
                  expanded={expandedFilters.salaryRange}
                />
                
                <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition mt-4">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-72 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filter by</h2>
                <button className="text-gray-500 text-sm">Reset</button>
              </div>
              
              <FilterSection 
                title="Experience level" 
                options={[
                  { name: "Any work experience", count: 181 },
                  { name: "Less than 1 year", count: 21 },
                  { name: "1-2 years", count: 21 },
                  { name: "2-3 years", count: 125 },
                  { name: "3-5 years", count: 125 },
                  { name: "More than 5 years", count: 125 }
                ]}
                filterKey="experienceLevel"
                expanded={expandedFilters.experienceLevel}
              />
              
              <FilterSection 
                title="Job title" 
                options={[
                  { name: "iOS Developer", count: 181 },
                  { name: "Android Developer", count: 21 },
                  { name: "Laravel Developer", count: 125 },
                  { name: "UX/UI Designer", count: 1259 }
                ]}
                filterKey="jobTitle"
                expanded={expandedFilters.jobTitle}
              />
              
              <FilterSection 
                title="Country" 
                options={[
                  { name: "USA", count: 181 },
                  { name: "UK", count: 21 },
                  { name: "China", count: 125 }
                ]}
                filterKey="country"
                expanded={expandedFilters.country}
              />
              
              <FilterSection 
                title="State" 
                options={filterOptions.state}
                filterKey="state"
                expanded={expandedFilters.state}
              />
              
              <FilterSection 
                title="Gender" 
                options={filterOptions.gender}
                filterKey="gender"
                expanded={expandedFilters.gender}
              />
              
              <FilterSection 
                title="Industry" 
                options={filterOptions.industry}
                filterKey="industry"
                expanded={expandedFilters.industry}
              />
              
              <FilterSection 
                title="Skill" 
                options={filterOptions.skill}
                filterKey="skill"
                expanded={expandedFilters.skill}
              />
              
              <FilterSection 
                title="Company" 
                options={filterOptions.company}
                filterKey="company"
                expanded={expandedFilters.company}
              />
              
              <FilterSection 
                title="Functional areas" 
                options={filterOptions.functionalAreas}
                filterKey="functionalAreas"
                expanded={expandedFilters.functionalAreas}
              />
              
              <FilterSection 
                title="Salary range" 
                options={filterOptions.salaryRange}
                filterKey="salaryRange"
                expanded={expandedFilters.salaryRange}
              />
              
              <button className="w-full py-3 primary-button text-white font-medium rounded-md  transition">
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
                  <div 
                    key={job.jobId} 
                    className="p-4 sm:p-6 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleJobSelect(job)}
                  >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveJob(job.jobId);
                        }}
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
      
      {/* Job Detail Popup for desktop */}
      {selectedJob && !isMobile && (
        <div className="fixed top-0 right-0 bottom-0 w-[650px] bg-white shadow-xl z-50 overflow-y-auto">
          <JobDetail job={selectedJob} onClose={handleCloseJobDetail} isMobile={false} />
        </div>
      )}
      
      {/* Add a semi-transparent overlay behind the job detail for desktop */}
      {selectedJob && !isMobile && (
        <div className="fixed inset-0 bg-[#00000061]  z-40" onClick={handleCloseJobDetail}></div>
      )}
      
      {/* Job Detail Page for mobile - this would typically be handled by routing */}
      {selectedJob && isMobile && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <JobDetail job={selectedJob} onClose={handleCloseJobDetail} isMobile={true} />
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;
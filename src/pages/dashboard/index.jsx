import DashBoardNavbar from '../../layout/DashBoardNavbar'
import ProfileCard from './components/ProfileCard'
import SponsoredJobsStatus from './components/SponsoredJobsStatus'
import ApplicationsSummary from './components/ApplicationsSummary'
import ApplicationsTable from './components/ApplicationsTable'
import StatsCards from './components/StatsCards'
import JobSuggestions from './components/JobSuggestions'
import RightSidebarSearch from './components/RightSidebarSearch'
import TechnicalSkillChart from './components/TechnicalSkillChart'
import SoftSkillChart from './components/SoftSkillChart'
import RecentJobSearch from './components/RecentJobSearch'

const DashboardPage = () => {
    return (
        <>
           <DashBoardNavbar/>
           <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen gap-6  pt-6 px-2 md:px-4">
             {/* Sidebar */}
             <div className="w-full lg:max-w-xs flex flex-col gap-4 mb-4 lg:mb-0">
               <ProfileCard />
             </div>
             {/* Main content and right sidebar */}
             <div className="flex-1 flex flex-col lg:flex-row gap-4">
               <div className="flex-1">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   <SponsoredJobsStatus />
                   <ApplicationsSummary />
                 </div>
                 <ApplicationsTable />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                   <TechnicalSkillChart />
                   <SoftSkillChart />
                 </div>
               </div>
               {/* Right sidebar */}
               <div className="w-full lg:max-w-xs flex flex-col gap-4 mt-4 lg:mt-0">
                 <StatsCards />
                 <RightSidebarSearch />
                 <JobSuggestions />
                 <RecentJobSearch />
               </div>
             </div>
           </div>
        </>
    )
}

export default DashboardPage 
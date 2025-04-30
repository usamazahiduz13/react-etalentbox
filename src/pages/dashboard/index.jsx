
import ProfileDetailes from './components/ProfileDetailes'
import { FaBriefcase, FaFileAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DashBoardNavbar from '../../layout/DashBoardNavbar'

const DashboardPage = () => {
    return (
        <>
           <DashBoardNavbar/>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                <div className="md:col-span-3">
                    <div className="bg-white rounded-lg shadow p-4">
                        <ProfileDetailes />
                    </div>
                </div>

                <div className="md:col-span-9">
                    <div className="flex flex-col space-y-4">
                        <div className="bg-white rounded-lg shadow p-4">
                            <h1 className="text-2xl font-bold mb-2">
                                Welcome to dashboard
                            </h1>
                        </div>

                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <FaFileAlt className="h-6 w-6 text-primary" />
                                <h2 className="text-xl font-semibold">
                                    Jobs
                                </h2>
                            </div>
                            
                            <p className="mb-4">
                                Discover the perfect job opportunity that matches your skills and experience.
                            </p>
                            
                            <div className="flex justify-end">
                                <Link to="/portal/jobs" className="no-underline">
                                    <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded flex items-center gap-2">
                                        <FaBriefcase className="h-5 w-5" />
                                        Browse Jobs
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage 
import React from 'react'
import Header from '../../layout/DashBoardNavbar'
import JobListingsPage from './components/JobsListing'
import { Routes, Route, useParams } from 'react-router-dom'

const JobDetail = () => {
  const { jobId } = useParams();
  // This component is just a wrapper that passes the jobId to the JobListingsPage component
  return <JobListingsPage jobId={jobId} />;
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <Routes>
        <Route path="/" element={<JobListingsPage />} />
        <Route path="/:jobId" element={<JobDetail />} />
      </Routes>
    </div>
  )
}

export default Index
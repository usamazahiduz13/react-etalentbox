import React from 'react'
import Header from '../../layout/DashBoardNavbar'
import JobListingsPage from './components/JobsListing'

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <JobListingsPage/>
    </div>
  )
}

export default Index
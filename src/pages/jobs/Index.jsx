import React from 'react'
import Header from '../../layout/DashBoardNavbar'
import JobListingsPage from './components/JobsListing'

const Index = () => {
  return (
    <div>
       <Header/>
       <JobListingsPage/>
    </div>
  )
}

export default Index
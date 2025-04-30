import React from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import DrivesUs from './components/DrivesUs'
import NextJob from './components/NextJob'
import FreelancePortfolio from './components/FreelancePortfolio'
import ReadyToJump from './components/ReadyToJump'
import Footer from './components/Footer'
import JobSteps from './components/JobSteps'

const LandingPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <DrivesUs />
      <JobSteps/>
      <FreelancePortfolio />
      <ReadyToJump />
      <Footer />
    </>
  )
}

export default LandingPage 
import React from 'react'
import LogoImg from '../../../assets/imgs/logo.png'

const Footer = () => {
  return (
    <div className="w-full md:pt-8 pt-4 md:px-16 sm:px-8 px-4 mx-auto text-center">
      <div className="max-w-[1280px] mx-auto  flex flex-wrap justify-between md:flex-row flex-col gap-8 md:items-center items-start">
        {/* Logo Section */}
        <div className="sm:col-span-3">
          <img src={LogoImg} className="w-[100px]" alt="Logo" />
        </div>

        {/* About Us Section */}
        <div className="sm:col-span-2">
          <h3 className="font-bold text-lg text-left">
            About Us
          </h3>
          <div className="flex flex-col items-start font-medium space-y-2 mt-4">
            <span className="text-sm">About JobLink</span>
            <span className="text-sm">Team</span>
            <span className="text-sm">Careers</span>
          </div>
        </div>

        {/* Job Seekers Section */}
        <div className="sm:col-span-2">
          <h3 className="font-bold text-lg text-left">
            Job Seekers
          </h3>
          <div className="flex flex-col items-baseline font-medium space-y-2 mt-4">
            <span className="text-sm">Browse Jobs</span>
            <span className="text-sm">How it Works</span>
            <span className="text-sm">FAQ</span>
          </div>
        </div>

        {/* Employers Section */}
        <div className="sm:col-span-2">
          <h3 className="font-bold text-lg text-left">
            Employers
          </h3>
          <div className="flex flex-col items-start font-medium space-y-2 mt-4">
            <span className="text-sm">Post a Job</span>
            <span className="text-sm">Employer Portal</span>
            <span className="text-sm">Success Stories</span>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="sm:col-span-3 bg-[#F5F7FA] rounded-md py-2 px-5 flex flex-col items-start">
          <h3 className="font-bold text-lg text-left">
            Newsletter
          </h3>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 mt-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        <p className='text-sm text-left text-gray-600'>Subscribe to our newsletter to get the latest news and updates.</p>
        </div>
      </div>
      <div className='max-w-[1280px] mx-auto  flex justify-between sm:items-center items-start sm:flex-row flex-col py-4 mt-8 gap-4'>
        <p className='text-base font-medium'>© 2025 JobLink. All rights reserved.</p>
        <div className='flex items-center gap-4'>
          <p className='text-base font-medium cursor-pointer hover:text-blue-500'>Privacy Policy</p>
          <p className='text-base font-medium cursor-pointer hover:text-blue-500'>Terms of Service</p>
        </div>
      </div>
    </div>
  )
}

export default Footer 
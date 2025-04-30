
import React from 'react'
import { kpisData } from '../utilis/data'
import heroAnimation from '../../../assets/animation/heroAnimation.json'
import Lottie from 'lottie-react'

const HeroSection = () => {
   
    return (
        <div className='bg-[#F5F7FA] flex justify-center items-center border-b border-b-blue-500'>
            <div className='max-w-[1280px] md:px-16 sm:px-8 px-4 md:py-10 py-6 pb-6'>
            <div className=" mx-auto flex md:flex-row flex-col gap-6 justify-center items-center ">
                <div className='w-full  lg:w-[65%] md:w-1/2' >
                    <h1 className="text-4xl md:text-5xl font-bold text-left">
                        Talent Hub - Unlock your Potential with one Profile
                    </h1>
                    <p className="text-gray-600 max-w-[500px] text-left mt-4">
                        Discover your dream jobs, focus on soft skills, boost your income and upskill with our innovative powered platform.
                    </p>

                    <div className="mt-8">
                       <button className='primary-button'>Get Started</button>
                    </div>

                </div>
                <div className='w-full lg:w-[35%] md:w-1/2'>
                    <Lottie animationData={heroAnimation} loop={true} />
                </div>
            </div>
            <div className="w-full mt-6 justify-center items-center grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 ">
                        {
                            kpisData().map((item, index) => (
                                <div key={index} className="flex gap-4 items-center py-4 pl-4 pr-8 bg-white rounded-lg shadow-2xl">
                                    <div className="flex items-center gap-2 p-4 bg-[#1860A2] rounded-md text-white">
                                        {item.icon}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                    <span className="text-2xl font-medium leading-none">
                                            {item.count}
                                        </span>
                                    <p className=" text-base text-gray-800 text-center">
                                        {item.title}
                                    </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            </div>
        </div>
    )
}

export default HeroSection 
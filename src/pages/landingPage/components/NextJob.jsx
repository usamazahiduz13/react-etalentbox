import React from 'react';

// Utils
import { nextJobSteps } from '../utilis/data.jsx';
import NextJobImg from '../../../assets/imgs/landingpage/next-job-img.png';
import StyledContainer from './StyledContainer';

const NextJob = () => {
    return (
        <StyledContainer className="my-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-3xl font-semibold max-w-lg text-blue-500">
                    The Fast Track to Your Next Job
                </h2>

                <button 
                    className="px-6 py-2 rounded-md text-white bg-blue-500 hover:opacity-90 transition-opacity"
                >
                    Learn More
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-20">
                <div>
                    <img src={NextJobImg} alt="Next Job" className="max-w-full" />
                </div>
                <div className="relative">
                    {nextJobSteps.map((step, index) => (
                        <div key={index} className="mb-12 relative">
                            {/* Vertical line */}
                            {index < nextJobSteps.length - 1 && (
                                <div 
                                    className="absolute w-0.5 h-full left-2 top-7 -z-10 bg-blue-500"
                                ></div>
                            )}
                            
                            <div className="flex">
                                {/* Dot */}
                                <div 
                                    className="w-4 h-4 rounded-full border-2 bg-white mt-2 z-10 border-blue-500"
                                ></div>
                                
                                {/* Content */}
                                <div className="ml-6">
                                    <h3 
                                        className="text-xl font-bold leading-tight text-blue-500"
                                    >
                                        {step.label}
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StyledContainer>
    );
};

export default NextJob; 
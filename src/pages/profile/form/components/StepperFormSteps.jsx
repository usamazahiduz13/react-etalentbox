import React from 'react';
import { steps } from '../../utilis/formUtilis.jsx';

const StepIcon = ({ icon, active }) => {
    return (
        <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                active ? 'bg-primary' : 'bg-gray-300'
            } text-white text-lg`}
        >
            {icon}
        </div>
    );
};

const StepperFormSteps = ({ step, setStep }) => {
    const activeStep = step;

    return (
        <div className="bg-gray-100 h-full flex flex-col md:p-4 p-2 w-full">
            {/* Mobile view - horizontal steps (visible on small screens) */}
            <div className="md:hidden w-full overflow-x-auto pb-4">
                <div className="flex items-center justify-between min-w-max px-2">
                    {steps.map((item, index) => (
                        <div key={item.title} className="flex flex-col items-center mx-2" onClick={() => setStep(index)}>
                            <div className="relative">
                                <span className={`${step === index ? 'bg-[#1458DC] text-white' : 'bg-white text-black'} rounded-full p-2 flex items-center justify-center shadow-sm`}>
                                    {item.icon}
                                </span>
                                {index < steps.length - 1 && (
                                    <div className="absolute top-1/2 left-full w-8 border-t-2 border-dashed border-gray-300"></div>
                                )}
                            </div>
                            <span className={`text-xs mt-1 ${index === activeStep ? 'font-bold text-primary' : 'text-gray-700'}`}>
                                {item.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop view - vertical steps (visible on medium and larger screens) */}
            <div className="hidden md:flex flex-col space-y-2 grow h-full pl-10">
                {steps.map((item, index) => (
                    <div key={item.title} className="flex items-start cursor-pointer start" onClick={() => setStep(index)}>
                        <div className="flex flex-col items-center">
                            <span className={`${step === index ? 'bg-[#1458DC] text-white' : 'bg-white text-black'} rounded-full p-3 shadow-sm flex items-center justify-center z-10`}>
                                {item.icon}
                            </span>
                            {index < steps.length - 1 && (
                                <div className={`w-0 h-24 border-l-2 border-dashed border-gray-300 my-1`}></div>
                            )}
                        </div>
                        <div className="ml-3 mt-2">
                            <span className={`${index === activeStep ? 'font-bold text-[#1458DC]' : 'text-gray-700'}`}>
                                {item.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepperFormSteps; 
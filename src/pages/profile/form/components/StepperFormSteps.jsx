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
        <div
            className="bg-gray-100 p-4 min-h-full flex flex-col items-center h-full"
        >
            <div className="flex flex-col space-y-10 grow">
                {steps.map((item, index) => (
                    <div key={item.title} className="flex items-start cursor-pointer" onClick={() => setStep(index)}>
                        <div className="flex flex-col items-center">
                           <span className={`${step === index ? 'bg-[#1458DC] text-white' : 'bg-white text-black'} rounded-[10px] p-3`}>{item.icon}</span>
                            {index < steps.length - 1 && (
                                <div className={`w-px h-10 ${index < activeStep ? 'bg-primary' : 'bg-gray-300'}`}></div>
                            )}
                        </div>
                        <div className="ml-3 mt-2">
                            <span className={`${index === activeStep ? 'font-bold text-primary' : 'text-gray-700'}`}>
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